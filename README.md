# 🏦 MerigosPay

**MerigosPay** é um **gateway de pagamentos** moderno, seguro e escalável, desenvolvido para facilitar a integração de transações financeiras com alta performance e confiabilidade.  
O projeto combina tecnologias de ponta para oferecer **processamento rápido**, **monitoramento em tempo real** e **sistema antifraude avançado**.

## 🚀 Principais Recursos

- **Processamento de Pagamentos**  
  - Suporte a PIX, cartão de crédito e boleto bancário.
  - API unificada para múltiplos métodos de pagamento.
  - Integração com adquirentes e provedores de pagamento.

- **Sistema Antifraude Integrado**  
  - Análise de risco em tempo real.
  - Detecção de padrões suspeitos via regras dinâmicas.
  - Possibilidade de integração com provedores externos de antifraude.

- **Arquitetura Moderna e Escalável**  
  - **Drizzle ORM** para modelagem e manipulação de dados.
  - **Kafka** para mensageria assíncrona e processamento distribuído.
  - Microsserviços desacoplados para fácil manutenção e evolução.

- **Segurança**  
  - Criptografia de dados sensíveis.
  - Assinatura digital para validação de mensagens.
  - Conformidade com boas práticas de segurança (PCI DSS, LGPD).

- **Observabilidade**  
  - Logs estruturados.
  - Métricas e monitoramento de eventos.
  - Alertas configuráveis para incidentes.

## 🛠️ Tecnologias Utilizadas

| Tecnologia         | Função no Projeto |
|--------------------|-------------------|
| **Node.js**        | Plataforma principal de execução do backend. |
| **NestJS**         | Framework para estruturação modular e escalável. |
| **Drizzle ORM**    | ORM para manipulação de dados com tipagem forte e migrações seguras. |
| **PostgreSQL**     | Banco de dados relacional para persistência confiável. |
| **Apache Kafka**   | Mensageria para comunicação assíncrona entre serviços. |
| **Docker**         | Containerização e portabilidade do ambiente. |
| **TypeScript**     | Tipagem estática para maior segurança no desenvolvimento. |

## 🔄 Fluxo de Pagamento

1. **Criação do Pedido** — Cliente envia solicitação de pagamento via API.
2. **Validação e Registro** — Dados validados e gravados no banco (Drizzle/Postgres).
3. **Envio para Processamento** — Mensagem enviada para o Kafka.
4. **Serviço de Pagamento** — Consome mensagem, processa com adquirente e aguarda resposta.
5. **Antifraude** — Avalia transação antes da captura.
6. **Confirmação** — Status atualizado e resposta enviada ao cliente.

## 📊 Sistema Antifraude

O módulo antifraude utiliza:
- **Regras de negócio personalizadas**.
- **Histórico de transações** para detecção de padrões.
- **Integração opcional** com serviços externos para scoring.

---

## 🚧 Status do Projeto

📅 **Em desenvolvimento ativo**.  
🔜 Próximos passos:
- Implementar dashboard de administração.
- Adicionar suporte a webhook para notificações de status.
- Criar simulação de carga para testes de performance.

---

## ⚡ Como Rodar o Projeto (Desenvolvimento)

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/merigos-pay.git

# 2. Acesse o diretório
cd merigos-pay

# 3. Suba os containers necessários (Postgres, Kafka, Zookeeper)
docker-compose up -d

# 4. Instale dependências
pnpm install

# 5. Rode as migrations (Drizzle)
pnpm migrate

# 6. Inicie o ambiente de desenvolvimento
pnpm start:dev
