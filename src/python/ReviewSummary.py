# -*- coding: utf-8 -*-

import sys
sys.stdout.reconfigure(encoding='utf-8')

from PyKakao import KoGPT
api = KoGPT(service_key = "a7136d2423bac4c6ee019af8674d9c2c")

max_tokens = 30

# 사용자의 질문을 입력 받음
review = sys.argv[1]

review = review.replace("#","")
review = review.replace("\n"," ")

# 필수 파라미터
prompt = f"{review} 한줄 요약:"

# 결과 조회
result = api.generate(prompt, max_tokens, top_p=0.0)

print(result)