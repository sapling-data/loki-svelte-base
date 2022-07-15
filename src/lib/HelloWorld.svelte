<script>
  import { count, message } from './stores.js';
  const setMessage = (event) => {
    message.update(() => event.target.value);
  };
  const incrementCount = (event) => {
    count.update(n => n + 1);
  }
  const tailwindCheck = () => {
    alert('Yay Tailwind!');
  };

  let countValue;
  let messageValue;

  count.subscribe(value => {
    countValue = value;
  });

  message.subscribe(value => {
    messageValue = value ? value : 'Hello, world!';
  })
</script>

<div class="flex flex-col gap-7 items-center py-7">
  <h1 class="text-3xl font-bold" id="message">{messageValue}</h1>
  <div>
    <input
            type="text"
            on:input={setMessage}
            name="message"
            class="w-80 mx-auto border p-2 shadow-sm focus:ring-indigo-500
            focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
            placeholder="Type to update message" />
  </div>
  <div>
    <button class="inline-flex items-center px-2.5 py-1.5 border
      border-transparent text-xs font-medium rounded shadow-sm text-white
      bg-green-600 hover:bg-green-700
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            on:click={incrementCount}>count is: {countValue}</button>
  </div>
  <div>
    <button
            class="inline-flex items-center px-2.5 py-1.5 border
        border-transparent text-xs font-medium rounded shadow-sm text-white
        bg-indigo-600 hover:bg-indigo-700 focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click={tailwindCheck}>If this button is purple, you're riding the Tailwind!</button>
  </div>
  <p>
    Edit <code>src/lib/HelloWorld.svelte</code> to test hot module replacement.
  </p>
</div>
