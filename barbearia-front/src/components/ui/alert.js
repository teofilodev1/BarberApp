import './alert.css'; // ← única mudança

function getAlertContainer() {
    let container = document.getElementById("alert-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "alert-container";
        document.body.appendChild(container);
    }
    return container;
}

export function showAlert(message, type = "info", time = 4000) {
    const container = getAlertContainer();
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;
    container.appendChild(div);
    setTimeout(() => {
        div.style.opacity = "0";
        setTimeout(() => div.remove(), 300);
    }, time);
}

export function showConfirm(mensagem, onConfirmar) {
    const overlay = document.createElement("div");
    overlay.className = "confirm-overlay";
    overlay.innerHTML = `
        <div class="confirm-box">
          <p class="confirm-msg">${mensagem}</p>
          <div class="confirm-actions">
            <button class="confirm-btn confirm-cancel">Cancelar</button>
            <button class="confirm-btn confirm-ok">Confirmar</button>
          </div>
        </div>
    `;
    document.body.appendChild(overlay);
    const fechar = () => {
        overlay.style.opacity = "0";
        setTimeout(() => overlay.remove(), 200);
    };
    overlay.querySelector(".confirm-cancel").onclick = fechar;
    overlay.querySelector(".confirm-ok").onclick = () => {
        fechar();
        onConfirmar();
    };
    overlay.onclick = (e) => {
        if (e.target === overlay) fechar();
    };
}