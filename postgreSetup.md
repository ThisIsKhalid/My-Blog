Here’s your **`PostgreSQL_Guide.md`**:

```markdown
# PostgreSQL Quick Guide

## 1. How to Login to PostgreSQL in the Terminal
1. Open your terminal.
2. Use the following command to log in as the `postgres` user:
   ```bash
   sudo -u postgres psql
   ```
3. You’ll enter the `psql` interactive terminal. You should see something like this:
   ```
   psql (14.x)
   Type "help" for help.
   postgres=#
   ```

---

## 2. How to Create a Database
1. Once logged in to the `psql` terminal, run the following command to create a new database:
   ```sql
   CREATE DATABASE blog;
   ```
2. Confirm the database was created by listing all databases:
   ```sql
   \l
   ```
   You should see the new `blog` database in the list.

---

## 3. How to Connect PostgreSQL to VS Code
### Step 1: Install the PostgreSQL Extension in VS Code
1. Open VS Code.
2. Go to **Extensions** (`Ctrl+Shift+X`).
3. Search for `PostgreSQL` and install the extension by **Richard Hopton**.

### Step 2: Add a PostgreSQL Connection
1. Open the **Command Palette** in VS Code (`Ctrl+Shift+P`).
2. Search for and select **PostgreSQL: Add Connection**.
3. Enter the following connection details:
   - **Host**: `localhost`
   - **Port**: `5432`
   - **Database**: `blog`
   - **User**: `postgres`
   - **Password**: Your PostgreSQL password (e.g., `123456`).
4. Save the connection.

### Step 3: Verify the Connection
1. In the PostgreSQL sidebar, expand the connection to view your `blog` database, tables, and schemas.
2. Right-click the database and select **New Query** to run SQL commands.

---

### Bonus: Connection String for Your Application
Use the following connection string in your `.env` file:
```env
DATABASE_URL="postgresql://postgres:123456@localhost:5432/blog"
```

