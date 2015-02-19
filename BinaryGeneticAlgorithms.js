var GeneticAlgorithm = function () {};

GeneticAlgorithm.prototype.generate = function(length) 
{
    var chromosome="";
    for(var i=1;i<=length;i++)
    {
        var t=Math.random()*2;
        var c=t<1?'0':'1';
        chromosome+=c;
    }
    return chromosome;
};

GeneticAlgorithm.prototype.select = function(population, fitnesses) 
{
    var sum=0;
    for(var x=0;x<fitnesses.length;x++)
    {
        sum+=fitnesses[x];
    }
    var probs=new Array(population.length);
    var prevProb=0.0;
    for(var x=0;x<population.length;x++)
    {
        probs[x]=prevProb + (fitnesses[x]/sum);
        prevProb=probs[x];
    }
    var r1=Math.random();
    var count=0;
    while(r1>probs[count]){
      count++;
    }
    var selectedChromosomes=new Array(2);
    selectedChromosomes[0]=population[count];
    var r2=Math.random();
    count=0;
    while(r2>probs[count]){
      count++;
    }
    selectedChromosomes[1]=population[count];
    return selectedChromosomes;
};

GeneticAlgorithm.prototype.mutate = function(chromosome, p) 
{
    var newChromosome="";
    for(var i=0;i<chromosome.length;i++)
    {
        var c=chromosome.charAt(i);
        var prob=Math.random();
        if(prob<p)
        {
            c=(c=='1')?'0':'1';
        }
        newChromosome+=c;
    }
    return newChromosome;
};

GeneticAlgorithm.prototype.crossover = function(chromosome1, chromosome2) 
{
    var newChromosomes=new Array(2);
    var l=Math.floor(Math.random()*chromosome1.length);
    newChromosomes[0]=chromosome1.substring(0,l)+chromosome2.substring(l);
    newChromosomes[1]=chromosome2.substring(0,l)+chromosome1.substring(l);
    return newChromosomes;
};

GeneticAlgorithm.prototype.run = function(fitness, length, p_c, p_m, iterations) 
{
    var chromosomes=new Array(100);
    for(var i=0;i<100;i++)
    {
        chromosomes[i]=this.generate(length);
    }
    var fitnesses=new Array(100);
    for(var i=0;i<100;i++)
    {
        fitnesses[i]=fitness(chromosomes[i]);
    }
    for(var i=0;i<iterations;i++)
    {
        var newChromosomes=new Array(100);
        var newFitnesses=new Array(100);
        for(var j=0;j<50;j++)
        {
            var A=this.select(chromosomes,fitnesses);
            var p=Math.random();
            if(p<p_c)
            {
                A=this.crossover(A[0],A[1]);
            }
            for(var k=0;k<2;k++)
            {
                A[k]=this.mutate(A[k],p_m);
            }
            newChromosomes[2*j]=A[0];
            newChromosomes[(2*j)+1]=A[1];
            newFitnesses[2*j]=fitness(A[0]);
            newFitnesses[(2*j)+1]=fitness(A[1]);
        }
        chromosomes=newChromosomes;
        fitnesses=newFitnesses;
    }
    var ans='';
    var val=0;
    for(var i=0;i<100;i++)
    {
        if(fitness(chromosomes[i])>val)
        {
          ans=chromosomes[i];
          val=fitness(chromosomes[i]);
        }
    }
    return ans;
};
