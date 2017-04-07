class Clock {
    constructor() {
        this.width = 500;
        this.height = 500;
        this.canvas = null;
        this.ctx = null;
        this.rayon = null;

        this.start = this.start.bind(this)
        this.drawClock = this.drawClock.bind(this)
        this.drawDesign = this.drawDesign.bind(this)
        this.drawNumbers = this.drawNumbers.bind(this)
        this.drawTime = this.drawTime.bind(this)
        this.drawNumeric = this.drawNumeric.bind(this)

        this.start();
        requestAnimationFrame(this.drawNumeric)
        requestAnimationFrame(this.drawTime)
    }

    start() {
        this.canvas = document.querySelector('#clock'); // Element canvas
        this.canvas.width = this.width; // Assigne largeur
        this.canvas.height = this.height; // Assigne hauteur
        this.ctx = this.canvas.getContext('2d'); // 2D
        this.ctx.translate(this.width / 2, this.height / 2); // Centrage des coordonnées
        this.rayon = (this.canvas.height / 2) - 10; // Rayon du cercle
        this.drawClock();
    }

    drawClock() {
        this.drawDesign()
        this.drawNumbers()
    }

    drawDesign() {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.rayon, 0, 2 * Math.PI); // Cercle
        this.ctx.lineWidth = 3; // Epaisseur de ligne
        this.ctx.stroke()
    }

    drawNumbers() {
        for (let i = 0; i < 12; i++) { // 12 heures
            this.ctx.beginPath();
            this.ctx.rotate((Math.PI / 6));
            this.ctx.moveTo(this.rayon, 0);
            this.ctx.lineTo(this.rayon - 20, 0);
            this.ctx.stroke();
        }

        for (let i = 0; i < 75; i++) {
            if (i%5 !== 0) { // Si le reste de i / 5 n'est pas égale à 0 (donc on n'est pas sur une "heure")
                this.ctx.beginPath();
                this.ctx.rotate((Math.PI / 30));
                this.ctx.moveTo(this.rayon, 0);
                this.ctx.lineTo(this.rayon - 5, 0);
                this.ctx.stroke();
            }
        }
    }

    drawTime() {
        if (!this.canvas)
            return;

        requestAnimationFrame(this.drawTime)

        let now = new Date(); // Full Date
        let hours = now.getHours(); // Heures
        let min = now.getMinutes(); // Minutes
        let sec = now.getSeconds() // Secondes
        let mil = now.getMilliseconds() // Millisecondes
        hours = hours > 12 ? hours - 12 : hours;

        this.ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);

        this.drawClock()

        // Heures
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = 10;
        this.ctx.rotate((Math.PI / 6) * hours + (Math.PI / 360) * min + (Math.PI / 21600) * sec - Math.PI / 2);
        this.ctx.moveTo(0, 0)
        this.ctx.lineTo(this.rayon - 75, 0)
        this.ctx.lineCap = "round";
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();

        // Minutes
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = 7;
        this.ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec - Math.PI / 2);
        this.ctx.moveTo(0, 0)
        this.ctx.lineTo(this.rayon - 45, 0)
        this.ctx.lineCap = "round";
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();

        // Secondes
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = 7;
        this.ctx.strokeStyle = "red";
        this.ctx.arc(0, 0, 5, 0, 2 * Math.PI); // Cercle
        this.ctx.rotate((Math.PI / 30) * sec + (Math.PI / 30000) * mil - Math.PI / 2)
        this.ctx.moveTo(0, 0)
        this.ctx.lineTo(this.rayon - 15, 0)
        this.ctx.lineCap = "round";
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }

    drawNumeric() {
        if (!this.canvas)
            return;

        requestAnimationFrame(this.drawNumeric)

        let now = new Date(); // Full Date
        let hours = now.getHours(); // Heures
        let min = now.getMinutes(); // Minutes
        let sec = now.getSeconds() // Secondes

        hours = hours < 10 ? "0" + hours : hours;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        // Numerique
        document.querySelector('.numeric_clock').innerText = `${hours}:${min}:${sec}`;
    }
}

window.addEventListener('load', () => new Clock())
