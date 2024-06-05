# Como utilizar o script de envio de mensagens no WhatsApp Web

Este script permite que você envie mensagens automaticamente no WhatsApp Web. Ele lê um texto, divide-o em linhas e envia cada linha como uma mensagem separada. Você pode especificar quantas vezes o conjunto de mensagens deve ser enviado.

## Passo a passo

1. Abra o WhatsApp Web no seu navegador. Você pode fazer isso visitando [https://web.whatsapp.com](https://web.whatsapp.com) e escaneando o QR code com o seu celular.

2. Abra a conversa onde você deseja enviar as mensagens.

3. Abra o console do navegador. Você pode fazer isso de várias maneiras:
   - No Chrome, você pode pressionar `Ctrl + Shift + J` (Windows / Linux) ou `Cmd + Option + J` (Mac).
   - No Firefox, você pode pressionar `Ctrl + Shift + K` (Windows / Linux) ou `Cmd + Option + K` (Mac).
   - Alternativamente, você pode clicar com o botão direito em cima do campo escrever mensagens, selecionar "Inspecionar" ou "Inspecionar Elemento", e então selecionar a aba "Console".

4. Copie o script do arquivo send-text-zap-script.js e modifique o texto como quiser.

5. No console, cole o script e dê enter.

## Código:

```
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
```
