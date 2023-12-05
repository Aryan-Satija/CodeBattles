#include <bits/stdc++.h>
using namespace std;
int alternateDigitSum(int n){
   int sum = 0, cnt = 0; 
   while(n != 0){
      sum = (cnt%2) == 0? sum + (n%10) : sum - (n%10);
      cnt++;
      n /= 10;
    }
    return cnt%2 == 0 ? sum : -1*sum;
}

int main(){
    if(alternateDigitSum(521) == 4) cout << "1";
    else cout << "0";
    if(alternateDigitSum(111) == 1) cout << "1";
    else cout << "0";
    if(alternateDigitSum(886996) == 0) cout << "1";
    else cout << "0";
    return 0;
}