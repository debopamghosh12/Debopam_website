import Nav from "./components/Nav/Nav";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Stack from "./components/Stack/Stack";
import GithubActivity from "./components/GithubActivity/GithubActivity";
import Work from "./components/Work/Work";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Stack />
        <GithubActivity />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
