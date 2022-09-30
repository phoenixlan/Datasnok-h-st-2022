#include <stdio.h>
#include <stdlib.h>

void generate_lookup_table(int key, char* lookup, int size) {
	//Pass 1
	for(int i = 0; i < size; i++) {
		lookup[i] = (char)((key >> (i%24)) ^ i ^ 0xba);
	}
	//Pass 2
	for(int i = 0; i < size; i++) {
		lookup[i] = lookup[i] ^ lookup[(i*3) % size];
	}
	// Pass 3
	for(int i = 0; i < size; i++) {
		lookup[i] = lookup[(i+1) % size] ^ lookup[i] ^ (char)0x13;
	}
}

char* load(char* filename, int* file_size) {
	FILE* in = fopen(filename, "rb");

	fseek(in, 0L, SEEK_END);
	*file_size = ftell(in);
	fseek(in, 0L, SEEK_SET);

	char* data = malloc(*file_size);
	fread(data, 1, *file_size, in);
	fclose(in);

	return data;
}

void save(char* filename, char* data, int file_size) {
	FILE* out = fopen(filename, "wb");
	fwrite(data, 1, file_size, out);
	fclose(out);
}

int main(int argc, char** argv) {
	printf("Bjarnes SuperEncryptor 2000\n!!!extreme edition!!!\n");
	if(argc != 4) {
		printf("\nERROR:\nInvalid number of arguments.\nUsage: superencryptor [key] [file] [out]\n(The tool encrypts symmetrically)\n");
		return 1;
	}

	int num = atoi(argv[1]);

	unsigned char lookup[0x1000];
	generate_lookup_table(num, lookup, 0x1000);
	
	int file_size = 0;
	char* plaintext = load(argv[2], &file_size);

	// Encrypt
	for(int i = 0; i < file_size; i++) {
		plaintext[i] = plaintext[i] ^ lookup[i % 0x1000];
	}

	// Save
	save(argv[3], plaintext, file_size);
	printf("*ding*\n");

	return 0;
}
