export const json = <T extends object>(content: T, code = 200): Response => {
  return new Response(JSON.stringify(content), {
    status: code,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
