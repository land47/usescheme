export default function backgroundColor() {
  return getComputedStyle(document.body).getPropertyValue(
    "--background_content"
  );
}
