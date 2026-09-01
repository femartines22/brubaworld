# Integrações do site brubaworld

O que o site conversa por fora, o que precisa estar configurado e o que fazer quando parar de funcionar.

---

## Verificação rápida

Antes de investigar qualquer coisa, abra no navegador:

```
https://www.brubaworld.com.br/api/health
```

Ele testa token, permissão e colunas e responde em português qual item está com problema. Se todos os itens vierem com `"ok": true`, o formulário está funcionando.

---

## Variáveis de ambiente

Ficam em **Vercel → Settings → Environment Variables**, todas em *All Environments*. Uma cópia igual precisa existir no arquivo `.env.local` para rodar na sua máquina.

| Variável | Para que serve | Obrigatória |
|---|---|---|
| `NOTION_API_KEY` | Chave da integração "Site Brubaworld" no Notion | Sim |
| `NOTION_DATABASE_ID` | ID do banco CRM BRUBAWORLD | Sim |
| `NOTION_FINANCEIRO_ID` | ID do banco Financeiro, usado pela Kiwify | Para a Kiwify |
| `KIWIFY_WEBHOOK_TOKEN` | Senha na URL do webhook da Kiwify | Para a Kiwify |
| `RESEND_API_KEY` | Envia cópia de cada lead por e-mail | Recomendada |
| `RESEND_FROM` | Remetente do e-mail de cópia | Não |
| `LEAD_BACKUP_EMAIL` | Para onde vai a cópia. Padrão: brubaworld@gmail.com | Não |

**Variável nova só passa a valer depois de um novo deploy.** Adicionar no painel não afeta o site que já está no ar.

---

## Fluxo do formulário de leads

1. A pessoa envia o formulário na home
2. `POST /api/lead-personalizado` recebe
3. **Primeiro** guarda uma cópia por e-mail e no log
4. **Depois** lê o schema do CRM e cria o registro no Notion
5. Se o Notion recusar algum campo, tenta de novo com o mínimo e coloca o resto num aviso dentro do card
6. Se o Notion falhar por completo mas a cópia por e-mail tiver saído, o site ainda mostra sucesso — porque o lead não se perdeu

A ordem importa: a cópia vem antes justamente porque o Notion é a parte que já quebrou.

### Colunas que o CRM precisa ter

`Nome` (título), `Número`, `Destino Desejado`, `Idade`, `Primeira Vez no Destino`, `Data Estimada`, `Observações`, `Instagram`, `Email` e uma coluna do tipo *Status*.

A rota procura essas colunas ignorando acento, maiúscula e pontuação. Renomear "Destino Desejado" para "destino" não quebra nada. **Apagar** a coluna, sim.

O status inicial é lido do próprio Notion: o lead entra sempre na primeira etapa do funil, qualquer que seja o nome dela.

---

## Fluxo da Kiwify

1. Venda aprovada na Kiwify
2. Ela chama `POST /api/kiwify-venda?token=SENHA`
3. A rota confere a senha, ignora eventos que não sejam compra aprovada
4. Cria o lançamento na base Financeiro, sem duplicar se o mesmo pedido chegar duas vezes

Configuração na Kiwify: **Apps → Webhooks → Criar Webhook**, evento *Compra aprovada*, URL com o token na ponta.

---

## Quando parar de funcionar

Abra o health check primeiro. Ele costuma responder direto qual é o problema.

**"token inválido ou revogado"** — alguém gerou outra chave no Notion. Vá em notion.so/my-integrations, copie o *Internal Integration Secret* da integração "Site Brubaworld" e atualize `NOTION_API_KEY` no Vercel. Faça um novo deploy.

**"integração sem acesso"** — a conexão foi removida da página. No Notion, abra o banco → menu "..." → Conexões → adicione "Site Brubaworld".

**"faltando: [colunas]"** — alguém apagou ou renomeou colunas no CRM. Recrie com os nomes da lista acima.

**Formulário dá erro mas o health check está verde** — veja os logs no Vercel filtrando por `[lead]`. A mensagem do Notion diz o campo exato que falhou.

### Onde procurar os leads

Se o Notion estiver fora, os leads chegam por e-mail em brubaworld@gmail.com. Também ficam no log do Vercel, na linha `[lead] recebido:`, mas o plano Hobby guarda log por pouco tempo — o e-mail é a via confiável.

---

## Como configurar o e-mail de cópia

Sem isso, os leads dependem só do Notion. Leva cinco minutos.

1. Crie conta em [resend.com](https://resend.com) (plano gratuito: 3 mil e-mails por mês)
2. Em **API Keys**, gere uma chave (começa com `re_`)
3. No Vercel, adicione `RESEND_API_KEY` com esse valor
4. Faça um novo deploy
5. Confira em `/api/health` se o item "Cópia do lead por e-mail" ficou verde

Por padrão o remetente é `onboarding@resend.dev`, que só entrega para o e-mail dono da conta Resend. Para enviar de um endereço próprio, verifique o domínio `brubaworld.com.br` no Resend e defina `RESEND_FROM` como `contato@brubaworld.com.br`.

---

## Histórico

**Agosto de 2026** — O formulário parou por três dias. A causa foi o nome de uma etapa do funil no Notion: o código mandava `"Lead Novo"` e o valor gravado tinha uma diferença invisível, provavelmente um espaço a mais. O Notion recusava com `validation_error` e o lead se perdia inteiro, sem nenhum backup.

Foi o que motivou a cópia por e-mail, o modo mínimo de gravação e este health check.
