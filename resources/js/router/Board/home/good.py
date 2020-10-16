input_line, input_line2 = input().split(" ")
input_line, input_line2 = int(input_line), int(input_line2)

value = []
point = []

input_line3 = []

# 입력
for i in range(0, input_line2):
    input_line3.append(int(input()))
    input_line = input_line - input_line3[i]
    value.append(input_line)

for i in range(len(value)):
    if i == 0 :
        point.append(input_line3[i] / 10)
    else :
        point.append(  point[i-1] + (input_line3[i] / 10))
    
    if point[i] >= input_line3[i] :
        for j in range(i, len(value)):
            value[j] += input_line3[i]
        point[i] -= input_line3[i] + (input_line3[i] / 10)


for i in range(len(value)):
    print(value[i], int(point[i]) )





