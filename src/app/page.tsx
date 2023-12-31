import { AuthContextProvider } from "@/hooks/useAuth";
import { QuizzesContextProvider } from "@/hooks/useQuizzes";
import { UserContextProvider } from "@/hooks/useUsers";


export default function Home() {
  return (
    <AuthContextProvider>
        <QuizzesContextProvider>
            <UserContextProvider>
                <main>
                  
                </main>
            </UserContextProvider>
        </QuizzesContextProvider>
    </AuthContextProvider>
  )
}
