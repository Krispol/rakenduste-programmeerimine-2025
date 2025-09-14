import "../Hello.css"

function Hello() {
  return (
    <>
      <div className="hello">
        <h1>Kristjan Põldmets</h1>
        <h2>Interests</h2>
        <ul>
          <li>DIY/tinkering</li>
          <li>Code</li>
          <li>Bikes</li>
          <li>Cars</li>
          <li>Remodeling/building</li>
          <li>3D design/prototyping</li>
          <li>Music</li>
          <li>Woodworking</li>
          <li>Hiking</li>
          <li>Vidya/Boardgames</li>
        </ul>
        <h2>Contact</h2>
        <form>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            name="email"
            type="email"
            required
          />
          <br />
          <label htmlFor="Message">Message</label>
          <br />
          <input
            id="email"
            name="email"
            type="email"
            required
          />
          <br />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  )
}

export default Hello
