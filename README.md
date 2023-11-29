## Дипломной работы: Доска объявлений

### Использовались следюущие технологии:

- React
- NextJS
- NextAuth
- Http-server
- React-Bootstrap

## Install
- Install dependencies
  ```bash
  npm install
  ```
- Создать локально файл .env.local (необходимо для работы NEXT-auth)
  ```diff
  GOOGLE_CLIENT_ID= + "ВАШ GOOGLE_CLIENT_ID"
  GOOGLE_SECRET= + "ВАШ GOOGLE_SECRET"

  GITHUB_CLIENT_ID= + "ВАШ GITHUB_CLIENT_ID"
  GITHUB_SECRET= + "ВАШ GITHUB_SECRET"

  NEXTAUTH_SECRET= + "Здесь может быть любое пароль"
  NEXTAUTH_URL= + "http://localhost: НОМЕР ПОРТА ВАШЕГО ЛОКАЛЬНОГО СЕРВЕРА"
  ```

## RUN

  ```bash
  npm serv
  ```


