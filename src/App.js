import GlobalStyles from "./components/GlobalComponent/GlobalStyles";
import { Header, Recipe, Result, AddRecipe } from "./components";

function App() {
  return (
    <main className="container">
      <GlobalStyles>
        <Header />
        <Result />
        <Recipe />
        <AddRecipe />
      </GlobalStyles>
    </main>
  );
}

export default App;
