// File: src/components/GoalCard.js
import '../GoalCard/GoalCard.css'
function GoalCard({ goal, onUpdateGoal, onDeleteGoal }) {
    const { id, name, targetAmount, savedAmount, deadline, category } = goal;
    const remaining = targetAmount - savedAmount;
    const percent = Math.min((savedAmount / targetAmount) * 100, 100).toFixed(1);
    const deadlineDate = new Date(deadline);
    const daysLeft = Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24));
    const completed = savedAmount >= targetAmount;
    const overdue = daysLeft < 0 && !completed;
    const warning = daysLeft <= 30 && !completed && !overdue;
  
    return (
      <div className={`goal-card ${overdue ? "overdue" : ""}`}>
        <h3>{name}</h3>
        <p>Category: {category}</p>
        <p>Saved: ${savedAmount} / ${targetAmount}</p>
        <p>Remaining: ${remaining}</p>
        <p>Deadline: {deadline} ({daysLeft} days left)</p>
        <div className="progress-bar">
          <div className="fill" style={{ width: `${percent}%` }} />
        </div>
        {completed && <p className="complete">🎉 Goal Completed!</p>}
        {warning && <p className="warning">⚠️ Less than 30 days left!</p>}
        {overdue && <p className="overdue-msg">❌ Overdue</p>}
        <button onClick={() => onDeleteGoal(id)}>Delete</button>
      </div>
    );
  }
  
  export default GoalCard;
  