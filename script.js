document.addEventListener('DOMContentLoaded', () => {
  const comboForm = document.getElementById('comboForm');
  const comboSelect = document.getElementById('combo');
  const networkSelect = document.getElementById('network');
  const videoLink = document.getElementById('videoLink');
  const responseMessage = document.getElementById('responseMessage');
  const submitButton = document.getElementById('submitButton');
  const btnText = document.getElementById('btnText');
  const spinner = document.getElementById('spinner');

  const API_URL = 'https://smmcoder.com/api/v2';
  const API_KEY = '89fa5c12e497c6031bf995fb4095070e';

  const combos = {
    1: { vistas: 50000, likes: 10000 },
    2: { vistas: 70000, likes: 15000 },
    3: { vistas: 100000, likes: 25000 }
  };

  const servicios = {
    ig: { vistas: 3150, likes: 157 },
    tt: { vistas: 2249, likes: 6374 }
  };

  comboForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    responseMessage.classList.add('d-none');

    const comboId = comboSelect.value;
    const red = networkSelect.value;
    const link = videoLink.value.trim();

    if (!link) {
      showMsg('❌ Pegá el enlace del video', 'danger');
      return;
    }

    const { vistas, likes } = combos[comboId];
    const vistaId = servicios[red].vistas;
    const likeId = servicios[red].likes;

    submitButton.disabled = true;
    btnText.textContent = 'Enviando...';
    spinner.classList.remove('d-none');

    try {
      const sendOrder = async (id, qty) => {
        const params = new URLSearchParams({
          key: API_KEY,
          action: 'add',
          service: id,
          link,
          quantity: qty
        });

        const res = await fetch(API_URL, {
          method: 'POST',
          body: params,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        return res.json();
      };

      await sendOrder(vistaId, vistas);
      await sendOrder(likeId, likes);

      showMsg(`✅ Combo enviado correctamente: ${vistas} vistas + ${likes} likes`, 'success');
    } catch (error) {
      showMsg('❌ Ocurrió un error al enviar el combo', 'danger');
    }

    submitButton.disabled = false;
    btnText.textContent = 'Enviar Combo';
    spinner.classList.add('d-none');
  });

  function showMsg(text, type) {
    responseMessage.className = `alert alert-${type} mt-4`;
    responseMessage.textContent = text;
    responseMessage.classList.remove('d-none');
  }

  particlesJS("particles-js", {
    particles: {
      number: { value: 160, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 }
      },
      opacity: {
        value: 1,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0, sync: false }
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false, speed: 4, size_min: 0.3, sync: false }
      },
      line_linked: { enable: false },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
});
