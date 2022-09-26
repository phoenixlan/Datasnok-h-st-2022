#include <stdio.h>
#include <stdlib.h>

int main(int argc, char** argv) {
	if(argc != 4) {
		printf("Invalid number of arguments.\nUsage: uberdecryptor [key] [file] [out]\n(The tool encrypts symmetrically)\n");
		return 1;
	}

	int num = atoi(argv[1]);

	unsigned char lookup[0x1000];

	//Pass 1
	for(int i = 0; i < sizeof(lookup); i++) {
		lookup[i] = num ^ ((unsigned char)i&0xFF) ^ 0xba;
	}
	//Pass 2
	for(int i = 0; i < sizeof(lookup); i++) {
		lookup[i] = lookup[i] ^ lookup[(i*3)%sizeof(lookup)];
	}
	// Pass 3
	for(int i = 0; i < sizeof(lookup); i++) {
		lookup[i] = lookup[(i+1)%sizeof(lookup)] ^ lookup[i] ^ 0x13;
	}

	FILE* in = fopen(argv[2], "rb");

	fseek(in, 0L, SEEK_END);
	int file_size = ftell(in);
	fseek(in, 0L, SEEK_SET);

	char* plaintext = malloc(file_size);
	fread(plaintext, 1, file_size, in);
	fclose(in);

	// Encrypt
	for(int i = 0; i < file_size; i++) {
		plaintext[i] = plaintext[i] ^ lookup[i % sizeof(lookup)];
	}

	// Save
	FILE* out = fopen(argv[3], "wb");
	fwrite(plaintext, 1, file_size, out);
	fclose(out);
	printf("*ding*\n");

	return 0;
}
