const templateFooter = `
<section class="container-columns columns-3">
  <section>
    <h3>UBICACIÓN</h3>
    <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1bO3tFLszqhcVS3B3HaQ5Gl4VDmwDUjs&ehbc=2E312F"
      width="100%" height="200" style="border: 0;" allowfullscreen="" loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"></iframe>
  </section>
  <section>
    <h3>CONÉCTATE</h3>
    <div class="columns">
      <div class="grid-container">
        <div class="column">
          <div class="logo-face">
            <a href="https://www.facebook.com/Fac.Cs.Administracion/" target="_blank">
              <h1>f</h1>
            </a>
          </div>
        </div>
        <div class="columns">
          <a href="https://www.instagram.com/fcad.uner/?hl=es-la" target="_blank">
            <div class="logo-instagram">
              <div class="punto">
              </div>
            </div>
          </a>
        </div>
        <div class="columns">
          <a href="https://www.youtube.com/channel/UCH07uX8PpyI1-ee24xb2iJQ" target="_blank">
            <div class="logo-youtube">
              <div class="triangulo">
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
  <section>
    <h3>CONTÁCTANOS</h3>
    <ul>
      <li>Monseñor Tavella 1424. Concordia-ER</li>
      <li>Tel: +54-345-4231400</li>
      <li>Fax: +54-345-4231410</li>
      <li>informes.fcad@uner.edu.ar</li>
    </ul>
  </section>
</section>
`;



export const loadFooter = ()=>{
  const footer = document.getElementById('footer')
  if (footer) {
    footer.innerHTML = templateFooter
  }
}