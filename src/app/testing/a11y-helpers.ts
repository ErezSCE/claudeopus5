/**
 * Shared accessibility assertions for screen component specs.
 */

/** Returns true when a rendered stylesheet styles `className` with a :focus-visible rule. */
export function hasFocusVisibleRule(className: string): boolean {
  return Array.from(document.querySelectorAll('style')).some((style) => {
    const css = style.textContent ?? '';
    const pattern = new RegExp(`\\.${className}(\\[[^\\]]+\\])?:focus-visible`);
    return pattern.test(css);
  });
}

/** Interactive controls inside `root`, in DOM (= tab) order. */
export function focusableControls(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>('button, input, [tabindex]'));
}

/** True when every control is reachable by Tab in DOM order (no positive or negative tabindex). */
export function usesNaturalTabOrder(root: HTMLElement): boolean {
  return focusableControls(root).every((el) => !el.hasAttribute('tabindex') && el.tabIndex === 0);
}
