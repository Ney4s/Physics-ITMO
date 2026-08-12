import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function Layout() {
  const { user, isAdmin, isStudent, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="site-header">
        <nav className="container nav">
          <NavLink to="/" className="logo">
            Физика · Математика
          </NavLink>
          <NavLink to="/about">Обо мне</NavLink>
          <NavLink to="/research">Исследования</NavLink>
          <NavLink to="/catalog">Каталог задач</NavLink>
          <NavLink to="/reviews">Отзывы</NavLink>
          <NavLink to="/contacts">Контакты</NavLink>

          {isStudent && (
            <NavLink to="/cabinet" className="btn btn-sm">
              Личный кабинет
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin/students" className="btn btn-sm">
              Админ-панель
            </NavLink>
          )}
          {user ? (
            <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
              Выйти
            </button>
          ) : (
            <NavLink to="/login" className="btn btn-outline btn-sm">
              Войти
            </NavLink>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© 2026 Преподаватель физики и математики · Репетиторство и научные исследования</p>
        </div>
      </footer>
    </>
  );
}
