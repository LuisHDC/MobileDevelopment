Tive muitos problemas para rodar e testar a aplicação juntamente com meu smartphone, por essa razão, tive que usar até mesmo o ngrok para disponibilizar uma rota HTTPS.
Portanto, se faz necessário editar as urls nos arquivos auth.service.ts e user.service.ts para http://localhost:3030.

Necessário que o projeto deste repositório esteja rodando: https://github.com/uedsonreis/authentication-nestjs
Iniciada a outra aplicação, rodar o comando: npx expo start