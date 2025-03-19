import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getTaskById, updateTask, deleteTask } from "../../services/api";

export default function TaskDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTask(id);
    }
  }, [id]);

  const fetchTask = async (taskId) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getTaskById(taskId);
      setTask(data);
      setTitle(data.title);
      setDescription(data.description);
      setCompleted(data.completed);
    } catch (error) {
      console.error("Error al cargar la tarea:", error);
      setError(
        "No se pudo cargar la tarea. Puede que no exista o haya sido eliminada."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!title.trim()) {
      alert("El título es obligatorio");
      return;
    }

    try {
      setIsSaving(true);
      const updated = await updateTask(id, { title, description, completed });

      // Mostrar mensaje de éxito y redirigir
      alert("Tarea actualizada correctamente");
      router.push("/tasks");
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      setError("Error al guardar los cambios");
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    // Confirmación antes de eliminar
    if (!confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      return;
    }

    try {
      await deleteTask(id);
      alert("Tarea eliminada correctamente");
      router.push("/tasks");
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      setError("No se pudo eliminar la tarea");
    }
  };

  if (isLoading) {
    return (
      <div
        className="loading-container"
        style={{
          padding: "2rem",
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div
          className="spinner"
          style={{
            display: "inline-block",
            width: "50px",
            height: "50px",
            border: "5px solid rgba(0, 0, 0, 0.1)",
            borderTopColor: "#3498db",
            borderRadius: "50%",
            animation: "spin 1s ease-in-out infinite",
          }}
        ></div>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <p>Cargando tarea...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "2rem",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#ffebee",
            color: "#c62828",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        >
          <h2>Error</h2>
          <p>{error}</p>
        </div>
        <Link href="/tasks">
          <button
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Volver a la lista de tareas
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>Editar Tarea</h1>
        <Link href="/tasks">
          <button
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#f5f5f5",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Volver
          </button>
        </Link>
      </div>

      {task && (
        <div
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "2rem",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  minHeight: "150px",
                }}
              />
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  style={{ marginRight: "0.5rem" }}
                />
                Marcar como completada
              </label>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <button
                type="button"
                onClick={handleDelete}
                style={{
                  padding: "0.75rem 1rem",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Eliminar Tarea
              </button>

              <button
                type="submit"
                disabled={isSaving}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isSaving ? "not-allowed" : "pointer",
                  opacity: isSaving ? 0.7 : 1,
                }}
              >
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </form>

          <div
            style={{
              marginTop: "2rem",
              borderTop: "1px solid #eee",
              paddingTop: "1rem",
            }}
          >
            <small>
              <strong>ID:</strong> {id} |<strong> Creada:</strong>{" "}
              {new Date(task.created_at).toLocaleString()}
            </small>
          </div>
        </div>
      )}
    </div>
  );
}
