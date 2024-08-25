
import Window from './window';

function App() {

  let page = 2;
  return (
    <>

    {
      page == 1 ? 
      <>
        <Sidebar/>
        <Container/>
      </>
      : <Window/>

    }

    </>
  )
}

export default App
