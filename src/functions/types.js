export const getCountEpisodes = (number) => {
    if(number == 0)
        return "Ningun episodio todavía";
    else if(number == 1)
        return number+" episodio";
    else
        return number+" episodios";
}