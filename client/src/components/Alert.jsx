function Alert({ color, message }) {
  return (
    <div
      className={`alert alert-${color} alert-dismissible fade show mb-3`}
      role="alert">
      <p className="mb-0">{message}</p>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"></button>
    </div>
  );
}
export default Alert;
