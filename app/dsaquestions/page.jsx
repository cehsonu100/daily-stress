// app/questions/page.js

import { auth } from "../../auth";
import { supabase } from "../../lib/supabaseClient";
import { redirect } from "next/navigation";
import ClientSideComponent from "./ClientSideComponent";

export default async function DsaQuestions() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const userId = session.user.id;

  // Server-side fetching
  const allQuestions = await fetchAllQuestions();
  const completedQuestions = await fetchCompletedQuestions(userId);

  // Merge the results to determine completion status
  const questionsWithStatus = mergeQuestionsWithStatus(allQuestions, completedQuestions);

  return <ClientSideComponent questionsWithStatus={questionsWithStatus} session={session} />;
}

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
