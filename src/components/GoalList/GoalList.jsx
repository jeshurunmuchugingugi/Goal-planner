import '../GoalList/GoalList.css'
import GoalCard from "../GoalCard/GoalCard";

function GoalList({ goals, onUpdateGoal, onDeleteGoal }) {
  return (
    <div className="goal-list">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onUpdateGoal={onUpdateGoal}
          onDeleteGoal={onDeleteGoal}
        />
      ))}
    </div>
  );
}

export default GoalList;
