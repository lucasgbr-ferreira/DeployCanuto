# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

## Personas

**Persona Interna: Paulo Ferreira (38 anos, Gerente de Vendas)**

* **Perfil:** Trabalha na loja de carros há 10 anos, conhece o mercado e coordena a equipe de vendas.
* **Objetivo:** Ter maior controle sobre o estoque de carros para agilizar negociações e aumentar vendas.
* **Necessidade:** Sistema integrado que mostre disponibilidade de veículos em tempo real, histórico de entrada e saída, e relatórios de desempenho.
* **Frustração:** Planilhas manuais que atrasam a atualização do estoque e falta de centralização das informações.

**Persona Externa: Fernanda Rocha (32 anos, Enfermeira)**

* **Perfil:** Solteira, rotina intensa entre hospital e faculdade, valoriza praticidade e segurança.
* **Objetivo:** Comprar um carro econômico e confiável, que esteja realmente disponível no estoque da loja.
* **Necessidade:** Acesso a informações claras sobre modelos disponíveis, preços e condições de financiamento.
* **Frustração:** Descobrir que o carro desejado não está mais disponível, enfrentar demora no atendimento e lidar com preços pouco transparentes.

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

| EU COMO... | QUERO/PRECISO ... | PARA ... |
| :--- | :--- | :--- |
| **Gerente de Vendas (Paulo)** | Um sistema integrado com disponibilidade de veículos em tempo real, histórico e relatórios de desempenho | Agilizar o monitoramento do estoque e aumentar as vendas. |
| **Cliente (Fernanda)** | Acessar informações claras e confiáveis sobre modelos disponíveis, preços e condições | Comprar um carro de forma segura e prática para agilizar minha rotina. |
| **Gerente de Vendas (Paulo)** | Cadastrar e gerenciar os veículos no sistema de forma rápida e intuitiva | Manter o catálogo online sempre atualizado e reduzir o trabalho manual. |
| **Cliente (Fernanda)** | Iniciar uma conversa com o vendedor por um canal direto, como o WhatsApp | Tirar dúvidas rapidamente sobre um veículo de interesse sem burocracia. |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID | Descrição | Prioridade | Justificativa |
| :--- | :--- | :--- | :--- |
| **RF-001** | O sistema deve permitir a autenticação (login/logout) de usuários da concessionária. | ALTA | Garante a segurança e o acesso restrito, fortalecendo a confiança na instituição. |
| **RF-002** | O sistema deve fornecer um formulário para o cadastro completo de novos veículos. | ALTA | Essencial para a operação, viabilizando a transparência e o acesso justo à informação no catálogo. |
| **RF-003** | O sistema deve permitir a visualização, edição e remoção de veículos cadastrados. | ALTA | Assegura a gestão eficiente do estoque, mantendo as informações sempre atualizadas e precisas. |
| **RF-004** | O sistema deve permitir alterar o status de um veículo (ex: "Disponível", "Vendido"). | MÉDIA | Melhora o controle operacional e fornece dados para relatórios, contribuindo para a governança. |
| **RF-005** | O sistema deve permitir o cadastro de clientes, associando-os a um veículo vendido. | ALTA | Constitui a base do módulo CRM para o gerenciamento de relacionamento e histórico de transações. |
| **RF-006** | O sistema deve exibir uma lista de clientes cadastrados com seu histórico. | MÉDIA | Facilita a gestão de pós-venda e o acompanhamento da satisfação, fortalecendo a relação de confiança. |
| **RF-007** | O sistema deve exibir publicamente uma listagem dos veículos disponíveis. | ALTA | Garante o acesso público e transparente ao estoque, sendo a principal vitrine para atrair clientes. |
| **RF-008** | O sistema deve oferecer funcionalidades de busca e filtros básicos (marca, preço, ano). | ALTA | Empodera o cliente ao permitir que encontre veículos de interesse de forma eficiente, promovendo acesso justo. |
| **RF-009** | O sistema deve possuir uma página de detalhes para cada veículo com suas informações completas, incluindo consulta da tabela FIPE. | ALTA | Pilar da transparência (ODS 16), pois centraliza dados relevantes para uma decisão de compra informada. |
| **RF-010** | A página de detalhes do veículo deve conter um botão de ação para iniciar conversa via WhatsApp. | ALTA | Cria um canal de comunicação acessível e direto, facilitando o processo de venda de forma justa. |

### Requisitos Não Funcionais

| ID | Descrição | Prioridade | Justificativa |
| :--- | :--- | :--- | :--- |
| **RNF-001** | O sistema deve suportar o cadastro de multi concessionárias de forma isolada. | ALTA | Garante instituições eficazes com equidade entre concessionárias. |
| **RNF-002** | O sistema deve armazenar dados em banco de dados relacional (ex.: PostgreSQL, MySQL). | ALTA | Promove confiabilidade das informações. |
| **RNF-003** | O sistema deve ser responsivo, adaptando-se a dispositivos móveis, tablets e desktops. | ALTA | Inclusão digital, acesso justo à informação. |
| **RNF-004** | O sistema deve disponibilizar logs de ações para auditoria de acessos e alterações de dados. | MÉDIA | Transparência e rastreabilidade de ações. |
| **RNF-005** | O sistema deve permitir upload e exibição de imagens (JPEG, PNG) com compressão. | MÉDIA | Clareza e transparência visual nas vendas. |
| **RNF-006** | O sistema deve ter tempo de resposta inferior a 3 segundos em conexões estáveis. | MÉDIA | Experiência justa e eficiente para o usuário. |
| **RNF-007** | O sistema deve oferecer simulação financeira clara, exibindo custos detalhados. | ALTA | Evita práticas enganosas → ética comercial. |
| **RNF-008** | O sistema deve suportar canal de denúncia e mediação de conflitos. | ALTA | Contribui para a resolução justa de conflitos. |
| **RNF-009** | O sistema deve disponibilizar relatórios automatizados (vendas e satisfação). | MÉDIA | Fortalece a prestação de contas e governança. |
| **RNF-010** | O sistema deve utilizar linguagem clara e acessível para clientes. | ALTA | Acesso justo à informação para todos. |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição | Justificativa |
|:--| :--- | :--- |
|01| O projeto deverá ser entregue até o final do semestre. | Prazo acadêmico. |
|02| O sistema deve ser desenvolvido com arquitetura SaaS. | Compatível com o escopo do projeto. |
|03| O banco de dados deve ser implementado (PostgreSQL/MySQL). | Suporte a integridade e escalabilidade. |
|04| O back-end deve ser construído em Node.js, Django ou ASP.NET, com API REST. | Flexibilidade e padrão de mercado. |
|05| O front-end deve ser desenvolvido em React + Next.js. | Alinhamento com foco em responsividade e UX. |
|06| O sistema deve ser hospedado em cloud (AWS, Azure, GCP). | Modelo SaaS exige infraestrutura distribuída. |
|07| O sistema deve incluir módulos obrigatórios: Catálogo, CRM, Simulador, Reputação/Mediação, Relatórios. | Alinhamento ao escopo do projeto. |
|08| A solução deve refletir os valores da ODS 16 (transparência, ética, confiança e inclusão). | Pilar central do projeto. |
