/**
 * 一、将Redux与UI集成
 * redux只有一个事件类型： some action was dispatched
 */
// miniaturized implementation of Redux store looks like:

function createStore(reducer) {
  var state;
  var listener = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listener.push(listener);
    return  function unsubscribe() {
      var index = listener.indexOf(listener);
      listener.splice(index, 1);
    }
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  dispatch({});

  return {dispatch, subscribe, getState};
}
// 很明显上面的dispatch后，不会检查state状态是否更改，

/**
 * 1.1 The Standard UI Update Cycle
 *  a、Create a Redux store
 *  b、Subscribe to updates
 *  c、Inside the subscription callback
 *    . get the current store
 *    . extract the data needed by this piece of UI
 *    . Update the UI with the data
 *  d、if necessary , render the UI with initial state
 *  e、Respond to UI inputs by dispatching Redux actions
 */

 // *** Every Redux UI integration layer is simply a fancier version of those steps
 // create a store
 const store = createStore(counter);
// subscribe to store updates
 store.subscribe(render);

 const valueEl = document.getElementById('value');

 // when the subscription callback runs:

 function render() {
   // get the current store state
   const state = store.getState();

   // extract the data you want
   const newValue = state.toString();

   // update the UI with the new value
   valueEl.innerHTML = newValue;
 }

 // display the UI with the initial store state
render();

// dispatch actions based on UI inputs
document.getElementById('increment')
    .addEventListener('click', () => {
      store.dispatch({type:'INCREMENT'});
    })

/**
 * 1.2 connect make the process of subscribling to store, checking for updated data, and triggering a re-render can be made more genetic c and resuable
 * 
 */

 // Each wrapper component is an individual subscriber to the Redux store
 function connect(mapSteteToProps, mapDispatchToProps) {
   return function(WrappedComponent) {
     return class extends React.Component {
       render() {
         return (
           <WrappedComponent 
           {...this.props}
           {/*and addtitonal props calculated from redux store */}
           {...mapStateToProps(store.getState(), this.props)}
           {...mapDispatchToProps(store.dispatch, this.props)}
           />
         )
       }

       componentDidMount() {
         // it remembers to subscribe to the store so it doesn't miss updates
         this.unsubscribe = store.subscribe(this.handleChange.bind(this));
       }

       componentWillUnmount() {
         this.unsubscribe();
       }

       handleChange() {
         // whenever the store state changes, it re-renders
         this.forceUpdate();
       }
     }
   }
 }

