import { NextResponse } from "next/server";
import { suggestedMessages } from "@/data/suggestedMessages";

function getRandomQuestions(questions: string[]): string[] {
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

export async function POST() {
  try {
    // Select 3 random questions
    const randomQuestions = getRandomQuestions(suggestedMessages);

    console.log(randomQuestions);

    // Return the random questions as a JSON response
    return NextResponse.json({ messages: randomQuestions });
  } catch (error) {
    if (error instanceof Error) {
      // General error handling
      console.error("An unexpected error occurred:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      console.error("An unknown error occurred");
      return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
    }
  }
}
