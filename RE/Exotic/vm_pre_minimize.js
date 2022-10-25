const rom = [
0x0A, 0x16,
//0x50, 0x48, 0x4F, 0x45, 0x4E, 0x49, 0x58, 0x7B, 0x61, 0x73, 0x6D, 0x5F, 0x68, 0x61, 0x63, 0x6B, 0x65, 0x72, 0x7D,
0x50, 0x47, 0x4F-2, 0x45-3, 0x4E-4, 0x49-5, 0x58-6, 0x7B-7, 0x34-8, 0x73-9, 0x6D-10, 0x5F-11, 0x68-12, 0x34-13, 0x63-14, 0x6B-15, 0x33-16, 0x72-17, 0x7D-18,
	0x13,

	0x06,
	0x03, 0x02,
	0x07,
	0x04,
	0x02,
	0x0c,
	0x03, 0x15,
	0x08,
	0x09, 0x25,
	0x0C,
	0x0a, 0x16,
	0x0b,
	0x00

]
const state = {
	a: 0x0,
	i: 0x0, // Instruction pointer
	b: 0x0,
	m: 0x0, // Magic
	s: 0x1, // Speed
	c: "" // output
}

function runVm() {
	while(state.s) {
		console.log(`${state.i.toString(16)} -> ${rom[state.i].toString(16)}`)
		switch(rom[state.i]) {
			case 0x0:
				state.s = 0;
				console.log("HALT");
				break;
			case 0x01:
				state.a++;
				console.log("INC A");
				break;
			case 0x02:
				state.b++;
				console.log("INC B");
				break;
			case 0x03:
				const inner = rom[state.i+1]
				state.a = rom[inner + state.a];
				state.i++;
				console.log("MOV [ip+1]+a, a");
				break;
			case 0x04:
				state.c = state.c += String.fromCharCode(state.m);
				console.log("BUF m");
				break;
			case 0x05:
				state.b = state.a;
				console.log("mov a, b");
				break;
			case 0x06:
				state.a = state.b;
				console.log("mov b, a");
				break;
			case 0x07:
				state.m = state.a + state.b;
				console.log("ADD a, b -> m")
				break;
			case 0x08:
				state.m = state.a - state.b;
				console.log("SUB a, b -> m");
				break;
			case 0x09:
				console.log("JUMP0 rom[ip+1]");
				if(!state.m) {
					state.i = rom[state.i+1]-1;
				} else {
					state.i++;
				}
				break;
			case 0x0a:
				state.i = rom[state.i+1]-1;
				console.log(`JMP 0x${(state.i+1).toString(16)}`);
				break;
			case 0x0b:
				console.log("OUT");
				vmOutput.innerHTML = state.c;
				break;
			case 0x0c:
				console.log("ABLANK");
				state.a = 0;
				break;
			default:
				console.log("Halt");
				state.s = 0;
				state.c += "Crash!";
				break;
		}
		state.i += state.s;
	}
}
