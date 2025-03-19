import React, { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTaskStatus,
} from "../services/api";
import Link from "next/link";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar las tareas apenas se monte el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await getTasks(); // Llama a nuestro servicio
      setTasks(data);
      setError(null);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      setError("No se pudieron cargar las tareas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      // Crea la tarea con los datos del formulario
      const newTask = await createTask(title, description);
      // Limpia los campos de texto
      setTitle("");
      setDescription("");
      // Actualiza la lista
      setTasks((prev) => [newTask, ...prev]);
    } catch (error) {
      console.error("Error al crear tarea:", error);
      alert("Error al crear la tarea");
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const updatedTask = await toggleTaskStatus(id, !currentStatus);

      // Actualiza la tarea en la lista local
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      // Filtra la tarea eliminada de la lista
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      alert("Error al eliminar la tarea");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Lista de Tareas</h1>

      <form
        onSubmit={handleCreateTask}
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #eee",
        }}
      >
        <h2>Nueva Tarea</h2>
        <div>
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              display: "block",
              marginBottom: "0.5rem",
              width: "100%",
              padding: "0.5rem",
            }}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              display: "block",
              marginBottom: "0.5rem",
              width: "100%",
              padding: "0.5rem",
              minHeight: "100px",
            }}
          ></textarea>
        </div>
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Crear Tarea
        </button>
      </form>

      {isLoading ? (
        <p>Cargando tareas...</p>
      ) : error ? (
        <div
          style={{ color: "red", padding: "1rem", backgroundColor: "#ffeeee" }}
        >
          {error}
          <button onClick={fetchTasks} style={{ marginLeft: "1rem" }}>
            Reintentar
          </button>
        </div>
      ) : (
        <>
          <h2>Mis Tareas ({tasks.length})</h2>
          {tasks.length === 0 ? (
            <p>No hay tareas. ¡Crea una!</p>
          ) : (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  style={{
                    border: "1px solid #ddd",
                    marginBottom: "0.8rem",
                    padding: "1rem",
                    borderRadius: "4px",
                    backgroundColor: task.completed ? "#f9fff9" : "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <strong
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {task.title}
                    </strong>
                    <small>
                      Creada: {new Date(task.created_at).toLocaleDateString()}
                    </small>
                  </div>

                  <p>{task.description}</p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "0.5rem",
                    }}
                  >
                    <div>
                      <input
                        type="checkbox"
                        id={`complete-${task.id}`}
                        checked={task.completed}
                        onChange={() =>
                          handleToggleComplete(task.id, task.completed)
                        }
                      />
                      <label
                        htmlFor={`complete-${task.id}`}
                        style={{ marginLeft: "0.5rem" }}
                      >
                        {task.completed ? "Completada" : "Pendiente"}
                      </label>
                    </div>

                    <div>
                      <Link href={`/tasks/${task.id}`}>
                        <button style={{ marginRight: "0.5rem" }}>
                          Editar
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        style={{
                          backgroundColor: "#f44336",
                          color: "white",
                          border: "none",
                          padding: "0.3rem 0.6rem",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
