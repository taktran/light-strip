import Yolk from 'yolk'

function Counter (props, children) {

  // map all plus button click events to 1
  const handlePlus = this.createEventHandler()
  const plusOne$ = handlePlus.map(() => 1)

  // map all minus button click events to -1
  const handleMinus = this.createEventHandler()
  const minusOne$ = handleMinus.map(() => -1)

  // merge both event streams together and keep a running count of the result
  const count$ = plusOne$.merge(minusOne$).scan((x, y) => x + y, 0).startWith(0)

  // prop keys are always cast as observables
  const title$ = props.title.map(title => `Awesome ${title}`)

  return (
    <div>
      <h1>{title$}</h1>
      <div>
        <button id="plus" onClick={handlePlus}>+</button>
        <button id="minus" onClick={handleMinus}>-</button>
      </div>
      <div>
        <span>Count: {count$}</span>
      </div>
      {children}
    </div>
  )
}

Yolk.render(<Counter title="Tak" />, document.getElementById('container'))