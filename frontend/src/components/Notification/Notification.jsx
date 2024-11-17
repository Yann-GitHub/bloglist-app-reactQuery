import { useNotification } from "./useNotification.hook";

export const Notification = () => {
  const { show, message, errorNotificationClass } = useNotification();

  if (!show) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop blury show"></div>
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog show modal-dialog-centered ">
          <div
            className={`modal-content successNotification ${errorNotificationClass}`}
          >
            <div className="modal-header">
              <h5 className="modal-title">Notification</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
