# 🎮 EXPIRE - Aposte Tempo, Não Dinheiro

![EXPIRE Logo](https://via.placeholder.com/1200x300/3b82f6/ffffff?text=EXPIRE+-+Aposte+Tempo%2C+N%C3%A3o+Dinheiro)

## 🌟 Sobre o Projeto

**EXPIRE** é uma plataforma revolucionária que reimagina completamente o conceito de jogos online. Em vez de apostar dinheiro, você investe **minutos do seu tempo**, criando uma experiência divertida, emocionante e **100% livre de riscos financeiros**.

### 💡 Conceito Inovador

- **⏰ Aposte Tempo**: Use minutos em vez de dinheiro real
- **🛡️ Zero Riscos**: Sem possibilidade de perdas financeiras
- **🎯 Diversão Pura**: Toda a emoção dos jogos tradicionais
- **🔄 Recarga Automática**: Ganhe minutos automaticamente a cada hora
- **🏆 Sistema de Conquistas**: Desbloqueie medalhas e rankings

## ✨ Funcionalidades Principais

### 🎮 **Jogos Funcionais**
- **Slot Machine**: Caça-níqueis com símbolos e multiplicadores
- **Crash Game**: Multiplicador crescente com cash-out estratégico  
- **Roleta Europeia**: Apostas em cores, números pares/ímpares
- **Mais jogos em desenvolvimento**

### 👤 **Sistema de Usuários**
- Autenticação segura com Supabase
- Perfis personalizáveis
- Gestão automática de tempo disponível
- Histórico completo de jogadas

### 🏆 **Social & Competição**
- Tabela de classificação global
- Sistema de conquistas progressivas
- Rankings por categoria de jogo
- Estatísticas detalhadas

### 🎨 **Interface Moderna**
- **Tema Claro/Escuro**: Alternância suave entre temas
- **Design Responsivo**: Otimizado para todos os dispositivos
- **Logo Personalizado**: Ícone de relógio animado
- **Animações Fluidas**: Transições e micro-interações

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React 18** + **TypeScript**
- **Tailwind CSS** com suporte a tema escuro
- **Lucide React** para ícones
- **React Router** para navegação
- **Context API** para gerenciamento de estado

### **Backend & Database**
- **Supabase** (PostgreSQL + Auth + Real-time)
- **Row Level Security (RLS)**
- **Triggers e Functions** automáticas
- **Migrações versionadas**

### **Deploy & DevOps**
- **Vercel** para hospedagem
- **GitHub** para versionamento
- **ESLint + TypeScript** para qualidade de código

## 📊 Estrutura do Banco de Dados

```sql
-- Principais tabelas
profiles          -- Perfis dos usuários com minutos disponíveis
games            -- Catálogo de jogos
game_scores      -- Pontuações dos jogadores
game_sessions    -- Sessões de jogo
leaderboard      -- Classificação global
achievements     -- Sistema de conquistas
user_achievements -- Progresso das conquistas
```

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 18+
- Conta no Supabase
- Git

### **Instalação**

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/expire.git
cd expire

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do Supabase

# 4. Execute as migrações do banco
# (Execute o SQL em supabase/migrations/create_complete_schema.sql no Supabase)

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

### **Configuração do Supabase**

1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute o script SQL em `supabase/migrations/create_complete_schema.sql`
3. Configure as variáveis no `.env`:

```env
VITE_SUPABASE_URL=sua_project_url
VITE_SUPABASE_ANON_KEY=sua_anon_key
```

## 🎯 Como Funciona

### **Sistema de Tempo**
- Cada usuário começa com **120 minutos** (2 horas)
- Jogos custam entre **3-6 minutos** por partida
- **+10 minutos** adicionados automaticamente a cada hora
- Máximo de **480 minutos** (8 horas) acumulados

### **Mecânica dos Jogos**
- **Slots**: 5 minutos por jogada, pontuação baseada em combinações
- **Crash**: 3 minutos por jogo, cash-out antes do crash
- **Roleta**: 4 minutos por aposta, apostas em cores/números

### **Sistema de Pontuação**
- Pontos ganhos baseados na performance
- Ranking global atualizado em tempo real
- Conquistas desbloqueadas automaticamente

## 🏆 Conquistas Disponíveis

| Conquista | Descrição | Raridade | Pontos |
|-----------|-----------|----------|---------|
| 🎯 Primeiro Passo | Jogue seu primeiro jogo | Comum | 50 |
| 🎮 Viciado em Jogos | Jogue 10 jogos diferentes | Raro | 200 |
| ⭐ Pontuação Alta | Alcance 1000 pontos | Épico | 500 |
| 👑 Mestre dos Slots | Jogue slots 50 vezes | Lendário | 1000 |

## 🚢 Deploy na Vercel

### **Deploy Automático**

1. **Push para GitHub**:
```bash
git add .
git commit -m "feat: complete EXPIRE platform"
git push origin main
```

2. **Conectar na Vercel**:
   - Importe o repositório do GitHub
   - Configure as variáveis de ambiente
   - Deploy automático a cada push

3. **Variáveis de Ambiente na Vercel**:
```
VITE_SUPABASE_URL=sua_project_url
VITE_SUPABASE_ANON_KEY=sua_anon_key
```

## 🎨 Temas e Design

### **Tema Claro/Escuro**
- Alternância suave com animações
- Persistência da preferência do usuário
- Cores otimizadas para acessibilidade

### **Logo e Identidade**
- Ícone de relógio (Clock) representando tempo
- Gradiente azul-roxo moderno
- Animação de pulso sutil

## 📱 Responsividade

- **Mobile First**: Design otimizado para celulares
- **Tablet**: Layout adaptado para tablets
- **Desktop**: Experiência completa em telas grandes
- **Navegação**: Menu hambúrguer no mobile

## 🔒 Segurança

- **Row Level Security (RLS)** em todas as tabelas
- **Autenticação JWT** com Supabase
- **Validação** client-side e server-side
- **Sanitização** de dados de entrada

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Desenvolvido com ❤️ por [@xjhowx](https://github.com/xjhowx)**

- GitHub: [@xjhowx](https://github.com/xjhowx)
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)

---

## 🎯 Roadmap Futuro

- [ ] **Mais Jogos**: Blackjack, Poker, Bingo
- [ ] **Sistema Social**: Chat, amigos, desafios
- [ ] **Torneios**: Competições semanais
- [ ] **NFTs de Tempo**: Colecionáveis únicos
- [ ] **Mobile App**: Aplicativo nativo
- [ ] **API Pública**: Para desenvolvedores

---

**🚀 EXPIRE - Onde o tempo é o seu maior investimento!**

*Pronto para produção e deploy! 🎮⏰*