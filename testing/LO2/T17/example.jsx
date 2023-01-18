// Without instrumentation
<button>
    <div>Show answer</div>
</button>


// With instrumentation
<button onClick={() => {
    console.log('Show answer button clicked')
    }}>
    <div>Show answer</div>
</button>