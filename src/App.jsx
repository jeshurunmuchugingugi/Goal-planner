import { useEffect, useState } from "react";
import GoalList from "./components/GoalList/GoalList";
import GoalForm from "./components/GoalForm/GoalForm";
import DepositForm from "./components/DepositForm/DepositForm";
import Overview from "./components/Overview/Overview";
import "./App.css";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((res) => res.json())
      .then(setGoals);
  }, []);

  function addGoal(newGoal) {
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((data) => setGoals((prev) => [...prev, data]));
  }

  function updateGoal(id, updatedFields) {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    })
      .then((res) => res.json())
      .then((updatedGoal) => {
        setGoals((prev) =>
          prev.map((g) => (g.id === id ? { ...g, ...updatedGoal } : g))
        );
      });
  }

  function deleteGoal(id) {
    fetch(`http://localhost:3000/goals/${id}`, { method: "DELETE" })
      .then(() => setGoals((prev) => prev.filter((g) => g.id !== id)));
  }

  return (
    <div className="dashboard-container">
      <main className="main-content">
        <header className="top-bar">
          <h1>Total Balance</h1>
          <h2>USD {goals.reduce((sum, g) => sum + g.savedAmount, 0).toLocaleString()}</h2>
        </header>
        <Overview goals={goals} />
        <div className="forms-wrapper">
          <GoalForm onAddGoal={addGoal} />
          <DepositForm goals={goals} onDeposit={updateGoal} />
        </div>
        <GoalList
          goals={goals}
          onUpdateGoal={updateGoal}
          onDeleteGoal={deleteGoal}
        />
      </main>
    </div>
  );
}

export default App;
