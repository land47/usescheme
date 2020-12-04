export default function backgroundColor() {
  return getComputedStyle(document.documentElement).getPropertyValue(
    "--background_content"
  );
}
