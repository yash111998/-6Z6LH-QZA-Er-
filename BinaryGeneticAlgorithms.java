import java.util.function.ToDoubleFunction;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

public class GeneticAlgorithm {
  /***************************************************************
   * Feel free to change the private methods' signatures (I did) *
   * Only the "run" functions are tested                         *
   ***************************************************************/
  private String generate(int length) 
  {
    String chromosome="";
    for(int i=0;i<length;i++)
    {
      double a=Math.random()*2;
      char c=a<1?'0':'1';
      chromosome+=c;
    }
    return chromosome;
  }
  
  private String[] select(List<String> population, List<Double> fitnesses) 
  {
    // TODO: Implement the select method
    double sum=0;
    for(Double f : fitnesses)
    {
      sum+=f.doubleValue();
    }
    double probs[]=new double [population.size()];
    double prevProb=0.0;
    for(int i=0;i<population.size();i++)
    {
      probs[i]=prevProb + (fitnesses.get(i) /sum);
      prevProb=probs[i];
    }
    double r1=Math.random();
    double r2=Math.random();
    int count=0;
    while(r1>probs[count])
    {
      if(count==99)
      {
        break;
      }
      count++;
    }
    String selectedChromosomes[]=new String[2];
    selectedChromosomes[0]=population.get(count);
    count=0;
    while(r2>probs[count])
    {
      if(count==99)
      {
        break;
      }
      count++;
    }
    selectedChromosomes[1]=population.get(count);
    return selectedChromosomes;
  }
  
  private String mutate(String chromosome, double p) 
  {
    // TODO: Implement the mutate method
    String newChromosome="";
    for(int i=0;i<chromosome.length();i++)
    {
      double prob=Math.random();
      char c=chromosome.charAt(i);
      if(prob<p)
      {
        c=(c=='1')?'0':'1';
      }
      newChromosome+=c;
    }
    return newChromosome;
  }
  
  private String[] crossover(String chromosome1, String chromosome2) 
  {
    // TODO: Implement the crossover method
    String newChromosomes[]=new String[2];
    int length=(int)(Math.floor(Math.random()*chromosome1.length()));
    newChromosomes[0]=chromosome1.substring(0,length)+chromosome2.substring(length);
    newChromosomes[1]=chromosome2.substring(0,length)+chromosome1.substring(length);
    return newChromosomes;
  }
  
  public String run(ToDoubleFunction<String> fitness, int length, double p_c, double p_m) 
  {
    // TODO: Implement the run method
    return run(fitness,length,p_c,p_m,100);
  }
  
  public String run(ToDoubleFunction<String> fitness, int length, double p_c, double p_m, int iterations) 
  {
    // TODO: Implement the run method
    ArrayList<String> chromosomes=new ArrayList<String>();
    for(int i=0;i<100;i++)
    {
      chromosomes.add(generate(length));
    }
    ArrayList<Double> fitnesses=new ArrayList<Double>();
    for(int i=0;i<100;i++)
    {
      fitnesses.add(fitness.applyAsDouble(chromosomes.get(i)));
    }
    for(int i=0;i<iterations;i++)
    {
        ArrayList<String> newChromosomes=new ArrayList<String>();
        ArrayList<Double> newFitnesses=new ArrayList<Double>();
        for(int j=0;j<50;j++)
        {
          String A[]= select(chromosomes,fitnesses);
          double p=Math.random();
          if(p<p_c)
          {
            A=crossover(A[0],A[1]); 
          }
          for(int k=0;k<2;k++)
          {
            A[k]=mutate(A[k],p_m);
          }
          newChromosomes.add(A[0]);
          newFitnesses.add(fitness.applyAsDouble(A[0]));
          newChromosomes.add(A[1]);
          newFitnesses.add(fitness.applyAsDouble(A[1]));
        }
        chromosomes=newChromosomes;
        fitnesses=newFitnesses;
    }
    String ans="";
    double val=0.0;
    for(String S : chromosomes)
    {
      if(fitness.applyAsDouble(S)>val)
      {
        ans=S;
        val=fitness.applyAsDouble(S);
      }
    }
    return ans;
  }
}
