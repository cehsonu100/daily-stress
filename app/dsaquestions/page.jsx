import { auth } from "../../auth";
import { supabase } from "../../lib/supabaseClient";
import { redirect } from "next/navigation";

async function fetchAllQuestions() {
  const { data, error } = await supabase.rpc("get_all_questions");
  if (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
  return data;
}

async function fetchCompletedQuestions(userId) {
  const { data, error } = await supabase.rpc("get_completed_questions", {
    p_user_id: userId,
  });
  if (error) {
    console.error("Error fetching completed questions:", error);
    return [];
  }
  return data;
}

function mergeQuestionsWithStatus(allQuestions, completedQuestions) {
  const completedQuestionIds = new Set(completedQuestions.map((q) => q.id));
  return allQuestions.map((question) => ({
    ...question,
    completed: completedQuestionIds.has(question.id),
  }));
}

export default async function DsaQuestions() {
  const session = await auth();
  if (!session?.user) redirect("/");
  console.log("session: ", session);
  const userId = session.user?.id;

  // Fetch all questions and completed questions
  const allQuestions = await fetchAllQuestions();
  const completedQuestions = await fetchCompletedQuestions(userId);

  // Merge results to determine completion status
  const questionsWithStatus = mergeQuestionsWithStatus(
    allQuestions,
    completedQuestions
  );

  return (
    <div>
      <h1>Questions List</h1>
      <ul>
        {questionsWithStatus.map((question) => (
          <li key={question.id}>
            <label>
              <input
                type="checkbox"
                checked={question.completed}
                onChange={() => handleToggle(session, question.id, !question.completed)}
              />
              {question.problem}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function handleToggle(session, questionId, completed) {
    const userId = session.user?.id;
  
    const { data, error } = await supabase.rpc('upsert_user_progress', {
      p_user_id: userId,
      p_question_id: questionId,
      p_completed: completed,
    });
  
    if (error) {
      console.error('Error updating progress:', error);
    } else {
      // Optionally, you could refetch the data or update state here to reflect the changes in the UI
    }
  }
