import { NavBar, ChatInterface } from '../components';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-15">
    <NavBar />
    <ChatInterface />
    </main>
  );
}
