/** @jsx Yolk.h */
/* eslint react/prop-types: 0 */
import Yolk from 'yolk';
// import Rx from 'rx';

// const NUM_LEDS = 30;

function Led (props, children) {
  const { num } = props;
  const handleToggle = this.createEventHandler();

  return (
    <li><button class='led'>LED {num}</button></li>
  );
}

function LedContainer (props, children) {
  // TODO: Make it an observable
  // const leds = Rx.Observable.range(0, NUM_LEDS).reduce((acc, x, idx, source) => {
  //   return acc.push(<Led num='{idx}' />);
  // }, []);

  return (
    <ul>
      <Led num='0'/>
      <Led num='1'/>
      <Led num='2'/>
      <Led num='3'/>
      <Led num='4'/>
      {children}
    </ul>
  );
}

Yolk.render(<LedContainer />, document.getElementById('led-container'));
