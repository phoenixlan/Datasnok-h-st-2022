const rom = [
0x0A, 0x16,
0x50, 0x47, 0x4d, 0x42, 0x4A, 0x44, 0x52, 0x74, 0x2C, 0x6A, 0x63, 0x54, 0x5C, 0x27, 0x55, 0x5C, 0x23, 0x61, 0x6B, 0x13, 0x06, 0x03, 0x02, 0x07, 0x04, 0x02, 0x0c, 0x03, 0x15, 0x08, 0x09, 0x25, 0x0C, 0x0a, 0x16, 0x0b, 0x00
]
const state = {
	a: 0x0,
	i: 0x0,
	b: 0x0,
	m: 0x0,
	s: 0x1,
	c: "" 
}

function runVm() {
	while(state.s) {
		switch(rom[state.i]) {
			case 0x0:
				state.s = 0;
				break;
			case 0x01:
				state.a++;
				break;
			case 0x02:
				state.b++;
				break;
			case 0x03:
				const inner = rom[state.i+1]
				state.a = rom[inner + state.a];
				state.i++;
				break;
			case 0x04:
				state.c = state.c += String.fromCharCode(state.m);
				break;
			case 0x05:
				state.b = state.a;
				break;
			case 0x06:
				state.a = state.b;
				break;
			case 0x07:
				state.m = state.a + state.b;
				break;
			case 0x08:
				state.m = state.a - state.b;
				break;
			case 0x09:
				if(!state.m) {
					state.i = rom[state.i+1]-1;
				} else {
					state.i++;
				}
				break;
			case 0x0a:
				state.i = rom[state.i+1]-1;
				break;
			case 0x0b:
				vmOutput.innerHTML = state.c;
				break;
			case 0x0c:
				state.a = 0;
				break;
			default:
				state.s = 0;
				state.c += "Crash!";
				break;
		}
		state.i += state.s;
	}
}
