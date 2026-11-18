function Header({ email, onSetEmail, onSetToken }) {
  function handleLogOut() {
    onSetEmail("");
    onSetToken("");
  }

  return (
    <header>
      <h1>Todo List App</h1>

      {email && (
        <div>
          <span>{email}</span>
          <button type="button" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
