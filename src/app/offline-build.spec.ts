import angularJson from '../../angular.json';
import ngswConfigJson from '../../ngsw-config.json';

/**
 * Guards the build artefacts that make the game installable/offline (US-033) and keep the
 * production payload under 2MB (US-034). These are the exact config files consumed by
 * `ng build --configuration production` (angular.json -> serviceWorker: ngsw-config.json).
 */

interface AssetGroup {
  name: string;
  installMode?: 'prefetch' | 'lazy';
  updateMode?: 'prefetch' | 'lazy';
  resources: { files?: string[]; urls?: string[] };
}

interface NgswConfig {
  index: string;
  assetGroups: AssetGroup[];
  dataGroups?: unknown[];
  navigationUrls?: unknown[];
}

interface Budget {
  type: string;
  name?: string;
  maximumWarning?: string;
  maximumError?: string;
}

interface BuildConfiguration {
  budgets?: Budget[];
  optimization?: boolean;
  outputHashing?: string;
  sourceMap?: boolean;
  serviceWorker?: string | boolean;
}

interface AngularWorkspace {
  projects: Record<
    string,
    {
      architect: {
        build: {
          options: { assets?: unknown[]; index?: string };
          configurations: Record<string, BuildConfiguration>;
        };
      };
    }
  >;
}

const ngswConfig = ngswConfigJson as NgswConfig;
const workspace = angularJson as AngularWorkspace;
const project = Object.values(workspace.projects)[0];
const production = project.architect.build.configurations['production'];

const TWO_MB = 2 * 1024 * 1024;

/** Converts an ngsw glob (`**`, `*`, `(a|b)`) to a RegExp, mirroring @angular/service-worker semantics. */
function globToRegExp(glob: string): RegExp {
  let pattern = '';
  for (let i = 0; i < glob.length; i++) {
    const ch = glob[i];
    if (ch === '*' && glob[i + 1] === '*') {
      pattern += '.*';
      i++;
      if (glob[i + 1] === '/') {
        i++;
        pattern += '/?';
      }
    } else if (ch === '*') {
      pattern += '[^/]*';
    } else if (ch === '(' || ch === ')' || ch === '|') {
      pattern += ch;
    } else if (ch === '?') {
      pattern += '[^/]';
    } else {
      pattern += ch.replace(/[.+^${}[\]\\]/g, '\\$&');
    }
  }
  return new RegExp(`^${pattern}$`);
}

function prefetchedPatterns(): RegExp[] {
  return ngswConfig.assetGroups
    .filter((group) => group.installMode === 'prefetch')
    .flatMap((group) => group.resources.files ?? [])
    .map(globToRegExp);
}

function isPrefetched(url: string): boolean {
  return prefetchedPatterns().some((re) => re.test(url));
}

/** Parses Angular budget sizes such as "500kb", "2mb", "1024b" into bytes. */
function budgetToBytes(size: string): number {
  const match = /^(\d+(?:\.\d+)?)\s*(b|kb|mb)?$/i.exec(size.trim());
  if (!match) {
    throw new Error(`Unrecognised budget size: ${size}`);
  }
  const value = Number(match[1]);
  const unit = (match[2] ?? 'b').toLowerCase();
  const multiplier = unit === 'mb' ? 1024 * 1024 : unit === 'kb' ? 1024 : 1;
  return value * multiplier;
}

describe('Offline service worker configuration (US-033)', () => {
  it('[US-033#1] production build emits the service worker so reloads work without network', () => {
    expect(production.serviceWorker).toBe('ngsw-config.json');
    expect(ngswConfig.index).toBe('/index.html');
  });

  it('[US-033#1] app shell (index, hashed scripts, styles, manifest) is prefetched at install time', () => {
    const appGroup = ngswConfig.assetGroups.find((group) => group.name === 'app');
    expect(appGroup).toBeDefined();
    expect(appGroup?.installMode).toBe('prefetch');
    expect(appGroup?.updateMode).toBe('prefetch');

    ['/index.html', '/manifest.webmanifest', '/main-7N6DHAY5.js', '/polyfills-FFHMD2TL.js', '/styles-CESIHBX2.css', '/chunk-ABC123.js'].forEach(
      (url) => expect(isPrefetched(url)).withContext(url).toBeTrue(),
    );
  });

  it('[US-033#1] offline navigations fall back to the cached index (no data groups needing network)', () => {
    expect(ngswConfig.dataGroups ?? []).toEqual([]);
    // Omitting navigationUrls keeps ngsw's default: every in-app navigation is served index.html.
    expect(ngswConfig.navigationUrls).toBeUndefined();
  });

  it('[US-033#2] all asset types (images, fonts, audio under /assets) are precached, not lazily fetched', () => {
    const assetsGroup = ngswConfig.assetGroups.find((group) => group.name === 'assets');
    expect(assetsGroup).toBeDefined();
    expect(assetsGroup?.installMode).toBe('prefetch');

    [
      '/assets/audio/siren.mp3',
      '/assets/audio/chomp.ogg',
      '/assets/sprites/fruit.png',
      '/assets/icons/icon-192.svg',
      '/startup.wav',
      '/icon.webp',
      '/font.woff2',
    ].forEach((url) => expect(isPrefetched(url)).withContext(url).toBeTrue());
  });

  it('[US-033#2] every asset group is prefetched so nothing required for play is left uncached', () => {
    ngswConfig.assetGroups.forEach((group) =>
      expect(group.installMode).withContext(group.name).toBe('prefetch'),
    );
  });

  it('[US-033#2] the src/assets folder is copied into the build so the service worker can hash it', () => {
    expect(project.architect.build.options.assets).toContain('src/assets');
  });
});

describe('Production bundle size budgets (US-034)', () => {
  const budgets = production.budgets ?? [];

  it('[US-034#1] no single emitted file may exceed 2MB, and the initial payload errors well below 2MB', () => {
    const anyBudget = budgets.find((budget) => budget.type === 'any');
    const initialBudget = budgets.find((budget) => budget.type === 'initial');

    expect(anyBudget?.maximumError).toBeDefined();
    expect(initialBudget?.maximumError).toBeDefined();
    expect(budgetToBytes(anyBudget?.maximumError ?? '0')).toBeLessThanOrEqual(TWO_MB);
    expect(budgetToBytes(initialBudget?.maximumError ?? '0')).toBeLessThan(TWO_MB);
  });

  it('[US-034#1] production build is optimised and strips source maps to minimise dist/ size', () => {
    expect(production.optimization).toBeTrue();
    expect(production.sourceMap).toBeFalse();
    expect(production.outputHashing).toBe('all');
  });

  it('[US-034#2] every budget defines warning and error thresholds with warning <= error', () => {
    expect(budgets.length).toBeGreaterThan(0);
    budgets.forEach((budget) => {
      expect(budget.maximumWarning).withContext(budget.type).toBeDefined();
      expect(budget.maximumError).withContext(budget.type).toBeDefined();
      expect(budgetToBytes(budget.maximumWarning ?? '0'))
        .withContext(budget.type)
        .toBeLessThanOrEqual(budgetToBytes(budget.maximumError ?? '0'));
    });
  });

  it('[US-034#2] budget size parser understands Angular units', () => {
    expect(budgetToBytes('2mb')).toBe(TWO_MB);
    expect(budgetToBytes('500kb')).toBe(500 * 1024);
    expect(budgetToBytes('8kb')).toBe(8192);
  });
});
