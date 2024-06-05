const LOOP_COUNT = 50; // Quantidade de vezes que o script irá enviar o texto

async function readTextAndSendMessage(scriptText, loopCount) {
  const lines = scriptText
    .split(/[\n\t]+/)
    .map((line) => line.trim())
    .filter((line) => line);

  const main = document.querySelector("#main");
  const textarea = main?.querySelector(`div[contenteditable="true"]`);

  if (!textarea) throw new Error("Não há uma conversa aberta");

  for (let loop = 0; loop < loopCount; loop++) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      console.log(line);

      textarea.focus();
      textarea.textContent = line;
      textarea.dispatchEvent(new Event("input", { bubbles: true }));

      await new Promise((resolve) => {
        setTimeout(() => {
          (
            main.querySelector(`[data-testid="send"]`) ||
            main.querySelector(`[data-icon="send"]`)
          ).click();
          resolve();
        }, 100);
      });

      if (i !== lines.length - 1)
        await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  return lines.length * loopCount;
}

readTextAndSendMessage(
  `
  Insira aqui o texto que você deseja enviar em loop.
  Cada linha é enviada em uma mensagem.
  `,
  LOOP_COUNT
)
  .then((e) => console.log(`Código finalizado, ${e} mensagens enviadas`))
  .catch(console.error);
