function Header({ email, onSetEmail, onSetToken }) {
  function handleLogOut() {
    onSetEmail("");
    onSetToken("");
  }

  return (
    <header>
      <h2>Todo List App</h2>

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
