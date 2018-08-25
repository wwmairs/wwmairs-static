/**
  * utils.js
  *
  **/

var MIDI_FREQS = [];
// generate array of midi frequency values
// from http://subsynth.sourceforge.net/midinote2freq.html
const a = 440;
for (var i = 0; i <= 127; i++) {
	MIDI_FREQS[i] = (a / 32) * (Math.pow(2, ((i - 9) / 12)));
}	

function scale(x, lowIn, highIn, lowOut, highOut) {
	return (((highOut - lowOut) * (x - lowIn))/(highIn - lowIn)) + lowOut;
}

function midiToFrequency(n) {
	return MIDI_FREQS[n];
}


function assert(bool, msg) {
	if (!bool) {
		console.log(msg);
		throw new Error(msg);
	}
}

// a straightforward vco

class VCO {
    constructor(context) {
        this.context         = context;
        this.oscillator      = context.createOscillator();
        this.oscillator.type = 'sine';
        this.frequencyParam  = this.oscillator.frequency;
        this.frequency       = 146;
        this.oscillator.start(0);

        this.input  = this.oscillator;
        this.output = this.oscillator;
    }

    set waveForm(w) {
        // should assert that w is well-formed
        this.oscillator.type = w;
    }

    get waveForm() {
        return this.oscillator.type;
    }

    set frequency(f) {
        this.frequencyParam.setValueAtTime(f, this.context.currentTime);
    }

    get frequency() {
        return this.frequencyParam.value;
    }

    // this can connect to either another module, or an AudioNode
    // I wonder how to let it connect to an AudioParam as well
    connect(module) {
        if (module.hasOwnProperty('input')) {
            this.output.connect(module.input);
        } else {
            this.output.connect(module);
        }
    }
}

// a straightforward vca

class VCA {
    constructor(context) {
        this.context         = context;
        this.gain            = context.createGain();
        this.input           = this.gain;
        this.output          = this.gain;
        this.amplitudeParam  = this.gain.gain;
        this.amplitude       = 0;
    }

    set amplitude(a) {
        this.gain.gain.setValueAtTime(a, this.context.currentTime);
    }

    get amplitude() {
        return this.gain.gain.value;
    }


    connect(module) {
        if (module.hasOwnProperty('input')) {
            this.output.connect(module.input);
        } else {
            this.output.connect(module);
        }
    }
}

// a straightforward vcf

class VCF {
    constructor(context) {
        this.context        = context;
        this.biquadFilter   = context.createBiquadFilter();
        this.frequencyParam = this.biquadFilter.frequency;
        // initial values
        this.type           = "lowpass";
        this.frequency      = 1000;
        this.Q              = 15;

        this.input = this.biquadFilter;
        this.output = this.biquadFilter;

    }

    set frequency(f) {
        this.biquadFilter.frequency.setValueAtTime(f, this.context.currentTime);
    }

    get frequency() {
        return this.biquadFilter.frequency.value;
    }

    set type(t) {
        // assert that t is well-formed
        this.biquadFilter.type = t;
    }

    get type() {
        return this.biquadFilter.type;
    }

    set Q(q) {
        this.biquadFilter.Q.setValueAtTime(q, this.context.currentTime);
    }

    get Q() {
        return this.biquadFilter.Q.value;
    }

    set gain(g) {
        this.biquadFilter.gain.setValueAtTime(g, this.context.currentTime);
    }

    get gain() {
        return this.biquadFilter.gain.value;
    }

    // this can connect to either another module, or an AudioNode
    // I wonder how to let it connect to an AudioParam as well
    connect(module) {
        if (module.hasOwnProperty('input')) {
            this.output.connect(module.input);
        } else {
            this.output.connect(module);
        }
    }
}

// a straightforward adsr

class ADSR {
    constructor(context) {
        this.context = context;
        this.attackTime  = 0.05;
        this.decayTime   = 0.1;
        this.sustainValue = .5;
        this.releaseTime = 0.6;
    }

    set attack(a) {
        this.attackTime = a;
    }
    get attack() {
        return this.attackTime;
    }

    set decay(d) {
        this.decayTime = d;
    }
    get decay() {
        return this.decayTime;
    }

    set sustain(s) {
        this.sustainValue = s;
    }
    get sustain() {
        return this.sustainValue;
    }

    set release(r) {
        this.releaseTime = r;
    }
    get release() {
        return this.releaseTime;
    }

    gateOn(d = 0) {
      let now = this.context.currentTime;
      this.param.cancelScheduledValues(now);
      this.param.setValueAtTime(0, now);
      this.param.linearRampToValueAtTime(1, now + this.attack);
      // something different happens if you're holding a note
      this.param.linearRampToValueAtTime(this.sustainValue, now + this.attack + this.decay);
      this.param.linearRampToValueAtTime(0, now + this.attack + this.decay + d + this.release);
    }

		off() {
			let now = this.context.currentTime;
			this.param.setValueAtTime(0, now);
			this.param.cancelScheduledValues(now);
		}

    // unlike other modules, this one connects to an AudioParam, 
    // rather than either a module or an AudioNode
    connect(param) {
        this.param = param;
    }
}

/**
    * a modulator module that modulates
    * 
    * relies on vco.js and vca.js
    **/

class MODU {
    constructor(context) {
        this.context         = context;
        this.modulator       = new VCO(this.context);
        this.vca             = new VCA(this.context);
        this.frequencyParam  = this.modulator.frequencyParam;
        this.frequency       = 146;
        this.amplitude       = 100;
        this.waveForm        = "square";
        this.modulator.connect(this.vca); 

        this.input  = this.modulator;
        this.output = this.vca;
    }

    set waveForm(w) {
        // should assert that w is well-formed
        this.modulator.waveForm = w;
    }

    get waveForm() {
        return this.modulator.waveForm;
    }

        set amplitude(a) {
                this.vca.amplitude = a;
        }
    
        get amplitude() {
                return this.vca.amplitude;
        }

    set frequency(f) {
                this.modulator.frequency = f;
    }

    get frequency() {
        return this.modulator.frequency;
    }

    // this can connect to either another module, or an AudioNode
    // I wonder how to let it connect to an AudioParam as well
    connect(module) {
        if (module.hasOwnProperty('input')) {
            this.output.connect(module.input);
        } else {
            this.output.connect(module);
        }
    }
}


/**
  * INST
  *
  * an instrument super class
	* 
	* and a monophonic sub class
  * contains its own oscillator, vca, and envelope
	* connects to window.ctx, if it exists, or else initializes it
  *
  * connects to a context
  * oscillator can be connected to for FM
  * envelope can be connected to for gate
  *
  * depends on modules:
  * 	vco.js
  * 	vca.js
  * 	adsr.js
  **/



class INST {
	constructor(_ctx) {
		this.ctx = _ctx;
	 }
	
	set frequency(f) {
		throw new Error("setter 'frequency' must be defined in a subclass of INST");
	}

	gateOn() {
		throw new Error("method 'gateOn()' must be defined in a subclass of INST");
	}

	gateOn(f) {
		throw new Error("method 'gateOn(f)' must be defined in a subclass of INST");
	}

	gateOn(f, d) {
		throw new Error("method 'gateOn(f, d)' must be defined in a subclass of INST");
	}

	connect(module) {
		throw new Error("method 'connect(module)' must be defined in a subclass of INST");
	}

}

class MONO extends INST {
	constructor(_ctx) {
		super(_ctx);
		this.vco    = new  VCO(this.ctx);
		this.vca    = new  VCA(this.ctx);
		this.env    = new ADSR(this.ctx);
		this.input 	= this.vco;
		this.output = this.vca;
		this.frequencyParam = this.vco.frequencyParam;

		// connecting things up	
		this.vco.connect(this.vca);
		this.env.connect(this.vca.amplitudeParam);
	  // vca needs to be connected to something
	}

	set frequency(f) {
		this.vco.frequency = f;
	}

	gateOn(f = false, d = false) {
		if (f) {
			this.frequency = f;
		}
		this.env.gateOn(d);
	}

	off() {
		this.env.off();
	}

	connect(module) {
		if (module.hasOwnProperty('input')) {
			this.output.connect(module.input);
		} else {
			this.output.connect(module);
		}
	}
}

/**
  * fm.js
  *
  * an FM synthesis instrument
  * sub class of INST
  *
  * depends on modules:
  *   inst.js
  *       modu.js
  *   and their dependencies
  *
  **/

class FM extends MONO {
    constructor(_ctx) {
        super(_ctx);
        this.modulator = new MODU(this.ctx);
        this.modulator.connect(this.frequencyParam);
				this.modFactor = 4;
    }

	gateOn(f = false, d = false) {
		if (f) {
			this.modulator.frequency = f / this.modFactor;
			this.frequency = f;
		}
		this.env.gateOn(d);
	}

	get modFactor() {
		return this.mf;
	}

	set modFactor(f) {
		this.mf = f;
	}
}


/**
  * instrument_handler.js
  *
  * holds on to instruments
  * receives and sends messages to communicate with other modules
  *
  **/

class Handler {
  constructor() {
    this.ctx = new (self.AudioContext || self.webkitAudioContext);
    this.instruments = [];
  }

  newFM() {
    let newFM = new FM(this.ctx);
		newFM.connect(this.ctx.destination);
    let name = "FM" + this.instruments.length;
    this.instruments.push({"name" : name, "inst" : newFM});
    return name;
  }

  noteon(name, frequency = false, duration = false) {
    let i = this.find(name);
    assert(i != false, "couldn't find inst for noteon");
    i.gateOn(frequency, duration);
  }

	mod(name, f) {
    let i = this.find(name);
    assert(i != false, "couldn't find inst for mod");
		assert(i.hasOwnProperty("modulator"), "trying to call mod on inst" + 
																					i + "which has no modulator");
		i.modFactor = f;
	}

	// handling amplitude adsr
	ampA(name, v) {
    let i = this.find(name);
    assert(i != false, "couldn't find inst for ampA");
		i.env.attack = v;
	}

	ampD(name, v) {
    let i = this.find(name);
    assert(i != false, "couldn't find inst for ampD");
		i.env.decay = v;
	}

	ampS(name, v) {
    let i = this.find(name);
    assert(i != false, "couldn't find inst for ampS");
		console.log("handler setting sustain to", v);
		i.env.sustain = v;
	}

	ampR(name, v) {
    let i = this.find(name);
    assert(i != false, "couldn't find inst for ampR");
		i.env.release = v;
	}

	off(name) {
		let i = this.find(name);
    assert(i != false, "couldn't find inst for off");
		i.off();
	}

  // returns the 'inst'
  find(name) {
    let found = false;
    this.mapInstruments((i) => {
      if (i.name == name) {
        found = i.inst;
      }
    });
    return found;
  }

  mapInstruments(f) {
    for (var i = 0; i < this.instruments.length; i++) {
      f(this.instruments[i]); 
    }
  }
}


/**
  * HTML elements
  **/

/**
  * vslider.js
  *
  * a vertical dom object slider
  *
  **/

class VSlider extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: "open"});
		this.min = 48;
		this.max = 72;
  }

  connectedCallback() {
    this.cont   = this.parentNode;
    this.height = this.cont.clientHeight;
    this.width  = this.cont.clientWidth;
    this.sliderHeight = 10;

    // def need a better color scheme, or maybe some programmatic way
    // to set colors
    this.style.background = "#f2e52d";
    this.style.position   = "absolute";

    // grab target, if specified, default is to give midi to freq
    if (this.hasAttribute("targetf")) {
      let target_string = this.getAttribute("targetf");
      this.updateCallback = (v) => {
        let t = eval(target_string);
        t.frequency = midiToFrequency(Math.round(v));
      };
    } else {
      this.updateCallback = (v) => v;
    }
    // make a circular element
    this.slider = document.createElement("div");
    this.slider.style.position = "absolute";
    this.slider.style.height = this.sliderHeight + "px";
    this.slider.style.width = "100%";
    this.slider.style.left = "0";
    this.slider.style.top = (this.height / 2) - 5 + "px";
    this.slider.style.background = "#5ed6a3";

    // make this shit draggable
    // vars for calculating distance traveled
    var pos1 = 0, pos2 = 0, that = this;
    function dragMouseDown(e) {
      e = e || window.event;
      pos2 = e.clientY; 
      document.onmouseup = endDrag;
      document.onmousemove = dragSlider;
    }

    function dragSlider(e) {
      e = e || window.event;
      pos1 = pos2 - e.clientY;
      pos2 = e.clientY;
      let newPos = that.slider.offsetTop - pos1;

      // make sure it's not off the ends
      if ((newPos <= that.offsetTop + that.offsetHeight - 10) &&
          (newPos >= that.offsetTop)) {
        that.slider.style.top = newPos + "px";
				// continuous updating
        //that.updateCallback(that.value);
      }
    }

    function endDrag() {
			// updating only on mouse up
			//console.log(that.updateCallback);
      that.updateCallback(that.value);
      document.onmouseup   = null;
      document.onmousemove = null;
    }
    this.slider.onmousedown = dragMouseDown;

    this.shadow.appendChild(this.slider);
  }

  set height(h) {
    this._h = h;
    this.style.height = h + "px";
  }

  get height() {
    return this._h;
  }

  get width() {
    return this._w;
  }

  set width(w) {
    this._w = w;
    this.style.width = w + "px";
  }

	set onUpdate(f) {
		this.updateCallback = f;
	}

	get value() {
    return scale(this.slider.offsetTop, this.offsetTop,
                 this.offsetTop + this.offsetHeight - this.sliderHeight,
                 this.min, this.max);
	}
}

customElements.define('vertical-slider', VSlider);

/**
  * sequ.js
  *
  * a sequencer with steps
  *
  * connects to global 'modules' object
  *
  **/

class SEQU extends HTMLElement {
  constructor() {
    super();
    this.sliders = [];
    this.shadow  = this.attachShadow({mode: "open"});
    this.on      = false;
  }

  connectedCallback() {
		this.currIndex = 0;
    this.duration  = .25;
    this.stepTime  = 250;
    this.cont      = this.parentNode;
    this.height    = this.cont.clientHeight;
    this.width     = this.cont.clientWidth;
  
    // make steps and hook em up
    if (this.hasAttribute("steps")) {
      this.numSteps = this.getAttribute("steps");
    } else {
      // default to 8
      this.numSteps = 8;
    }
    
    // creating sliders and adding them to shadow
    var xPos = 0;
    var stepWidth = this.width / this.numSteps;
    for (var i = 0; i < this.numSteps; i++) {
      let newDiv = document.createElement("div"); 
      newDiv.style.position = "absolute";
      newDiv.style.top = 0;
      newDiv.style.left = xPos + "px";
      newDiv.style.height = this.height - 100 + "px";
      newDiv.style.width = stepWidth + "px";

      let newSlider = document.createElement("vertical-slider");
      this.sliders.push(newSlider);

      newDiv.appendChild(newSlider);
      this.shadow.appendChild(newDiv);
      // this needs to happen after connectedCallback in VSlider  
      xPos += stepWidth;
    }

		// create button for on / off
		let newDiv = document.createElement("div");
		newDiv.style.position = "absolute";
		newDiv.style.top = this.height - 100 + "px";
		newDiv.style.left = 0;
		newDiv.style.height = 100 + "px";
		newDiv.style.width = this.width / 2 + "px";
		newDiv.style.background = "blue";
		newDiv.onclick = () => {this.toggle()};
		this.shadow.appendChild(newDiv);

		// sliders for duration, stepTime
		newDiv = document.createElement("div");
		newDiv.style.position = "absolute";
		newDiv.style.top = this.height - 100 + "px";
		newDiv.style.left = this.width / 2 + "px";
		newDiv.style.height = 100 + "px";
		newDiv.style.width = 100 + "px";
		this.durationSlider = document.createElement("vertical-slider");
		// setup updateCallback for slider
		this.durationSlider.min = .01;
		this.durationSlider.max = 1;
		newDiv.appendChild(this.durationSlider);
		this.shadow.appendChild(newDiv);
		this.durationSlider.onUpdate = (v) => {console.log('duration:', v); this.duration = v};

		newDiv = document.createElement("div");
		newDiv.style.position = "absolute";
		newDiv.style.top = this.height - 100 + "px";
		newDiv.style.left = this.width / 2 + 100 + "px";
		newDiv.style.height = 100 + "px";
		newDiv.style.width = 100 + "px";
		this.stepTimeSlider = document.createElement("vertical-slider");
		// setup updateCallback for slider
		this.stepTimeSlider.min = 1;
		this.stepTimeSlider.max = 500;
		newDiv.appendChild(this.stepTimeSlider);
		this.shadow.appendChild(newDiv);
		this.stepTimeSlider.onUpdate = (v) => {console.log('stepTime:', v); this.stepTime = v};

		// create select
		this.sel = document.createElement("select");
		this.sel.style.position = "absolute";
		this.sel.style.top = this.height - 50 + "px";
		this.sel.style.left = this.width - 50 + "px";
		this.sel.onchange = (o) => {this.targetName = o.target.value;};
		this.shadow.appendChild(this.sel);
  }


  mapSliders(f) {
    if (typeof(f) != "function") {
      throw "trying to mapSteps but 'f' is of type " + typeof(f);
    }
    for (let i = 0; i < this.sliders.length; i++) {
      f(this.sliders[i]); 
    } 
  }

	set duration(d) {
		this.d = d;
		if (this.on) {
			this.start();
		}
	}

	get duration() {
		return this.d;
	}

  set stepTime(t) {
    this.st = t;
    if (this.on) {
      this.start();
    }
  }
  
  get stepTime() {
    return this.st;
  }

  toggle() {
    this.on ? this.stop() : this.start();
  }

	restart() {
    this.currIndex  = 0;
		this.start();
	}

  start() {
    window.clearInterval(this.timer);
		assert(this.targetName != undefined, "trying to start sequencer with no target");
    this.on         = true;
    this.timer      = window.setInterval(() => {
			// send noteon to handler
			h.noteon(this.targetName,
							 midiToFrequency(Math.round(this.sliders[this.currIndex].value)),
							 this.duration);
      this.currIndex++;
      this.currIndex %= this.numSteps;
    }, this.stepTime);
  
  }

  stop() {
		assert(this.targetName != undefined, "trying to stop sequencer with no target");
    this.on = false;
    window.clearInterval(this.timer);
  }

	displayInstrument(name) {
		this.targetName = name;
		let opt = document.createElement("option");
		opt.innerHTML = name;
		opt.value = name;
		this.sel.appendChild(opt);
	}

	removeInstrument(name) {
	}
}

customElements.define('step-sequence', SEQU);

/**
	* FMElement
	*
	* a graphical interface for an FM inst
	*
	*/
class FMELEM extends HTMLElement {
  constructor() {
    super();
    this.shadow  = this.attachShadow({mode: "open"});
    this.on      = false;
		this.h			 = h;
		this.name    = h.newFM();
  }

  connectedCallback() {
    this.cont      = this.parentNode;
    this.height    = this.cont.clientHeight;
    this.width     = this.cont.clientWidth;
		
		// name and buttons and things I suppose
		let newDiv = document.createElement("div");
		newDiv.style.position = "absolute";
		newDiv.style.left = "50%";
		newDiv.style.transform = "translateX(-50%)";
		newDiv.innerHTML = "FM";
		this.shadow.appendChild(newDiv);
		// slider for modulating
		newDiv = document.createElement("div");
		newDiv.style.position = "absolute";
		newDiv.style.left = "0";	
		newDiv.style.top = "20px";
		newDiv.style.width = "100px";
		newDiv.style.height = "200px"	
		this.modSlider = document.createElement("vertical-slider");
		this.modSlider.min = 0;
		this.modSlider.max = 127;
		newDiv.appendChild(this.modSlider);
		this.shadow.appendChild(newDiv);
		this.modSlider.onUpdate = (v) => {h.mod(this.name, v)};

		// at some point it might be good to abstract this away, some adsr html element
		// controls for amplitude adsr
		// attack
		newDiv = document.createElement("div");
		newDiv.style.position = "absolute";
		newDiv.style.left = "0";	
		newDiv.style.top = "230px";
		newDiv.style.width = "100px";
		newDiv.style.height = "100px"	
		this.ampASlider = document.createElement("vertical-slider");
		this.ampASlider.min = 0;
		this.ampASlider.max = 1;
		newDiv.appendChild(this.ampASlider);
		this.shadow.appendChild(newDiv);
		this.ampASlider.onUpdate = (v) => {h.ampA(this.name, v)};
		// decay
		newDiv = document.createElement("div");
		newDiv.style.position = "absolute";
		newDiv.style.left = "100px";	
		newDiv.style.top = "230px";
		newDiv.style.width = "100px";
		newDiv.style.height = "100px"	
		this.ampDSlider = document.createElement("vertical-slider");
		this.ampDSlider.min = 0;
		this.ampDSlider.max = 1;
		newDiv.appendChild(this.ampDSlider);
		this.shadow.appendChild(newDiv);
		this.ampDSlider.onUpdate = (v) => {h.ampD(this.name, v)};
		// sustain
		newDiv = document.createElement("div");
		newDiv.style.position = "absolute";
		newDiv.style.left = "200px";	
		newDiv.style.top = "230px";
		newDiv.style.width = "100px";
		newDiv.style.height = "100px"	
		this.ampSSlider = document.createElement("vertical-slider");
		this.ampSSlider.min = 0;
		this.ampSSlider.max = 1;
		newDiv.appendChild(this.ampSSlider);
		this.shadow.appendChild(newDiv);
		this.ampSSlider.onUpdate = (v) => {h.ampS(this.name, v)};
		// release
		newDiv = document.createElement("div");
		newDiv.style.position = "absolute";
		newDiv.style.left = "300px";	
		newDiv.style.top = "230px";
		newDiv.style.width = "100px";
		newDiv.style.height = "100px"	
		this.ampRSlider = document.createElement("vertical-slider");
		this.ampRSlider.min = 0;
		this.ampRSlider.max = 1;
		newDiv.appendChild(this.ampRSlider);
		this.shadow.appendChild(newDiv);
		this.ampRSlider.onUpdate = (v) => {h.ampR(this.name, v)};

		// tell all sequencers to display name
		let sequencers = document.getElementsByClassName("sequencer");
		for (var i = 0; i < sequencers.length; i ++) {
			sequencers[i].displayInstrument(this.name);
		}
	}
}
  

customElements.define('fm-elem', FMELEM);
