// app/api-docs/layout.js
export default function ApiDocsLayout({ children }) {
  // Only render the Swagger UI, no header/footer
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
