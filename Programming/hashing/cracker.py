import hashlib

needle = "b8bb2d3334f2e7107c22c65a12580d8e"
chars = "BabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
count = 0
for a in chars:
    for b in chars:
        for c in chars:
            for d in chars:
                for e in chars:
                    count = count + 1

                    # Test et flagg
                    key = "PHOENIX{%s}" % (a+b+c+d+e)
                    h = hashlib.md5(key.encode('ascii')).hexdigest()
                    if h == needle:
                        print("FOUND: %s" % key)

                    # Print hvilken key vi er på en gang i blant
                    if count % 100000 == 0:
                        print(key)
